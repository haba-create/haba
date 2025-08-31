const { google } = require('googleapis');
const fs = require('fs').promises;
const path = require('path');

class GoogleDocsService {
  constructor() {
    this.auth = null;
    this.docs = null;
    this.drive = null;
    this.initializeAuth();
  }

  async initializeAuth() {
    try {
      // For production, use proper OAuth2 flow
      // For now, using service account credentials
      const auth = new google.auth.GoogleAuth({
        keyFile: process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH,
        scopes: [
          'https://www.googleapis.com/auth/documents',
          'https://www.googleapis.com/auth/drive'
        ]
      });

      this.auth = await auth.getClient();
      this.docs = google.docs({ version: 'v1', auth: this.auth });
      this.drive = google.drive({ version: 'v3', auth: this.auth });
    } catch (error) {
      console.error('Failed to initialize Google Auth:', error);
    }
  }

  async createDocument(title, content, folderId) {
    try {
      // Create the document
      const createResponse = await this.docs.documents.create({
        requestBody: {
          title: title
        }
      });

      const documentId = createResponse.data.documentId;

      // Add content to the document
      await this.updateDocument(documentId, content);

      // Move to specific folder if provided
      if (folderId) {
        await this.moveToFolder(documentId, folderId);
      }

      return {
        documentId,
        webViewLink: `https://docs.google.com/document/d/${documentId}/edit`,
        title
      };
    } catch (error) {
      console.error('Error creating document:', error);
      throw error;
    }
  }

  async updateDocument(documentId, content) {
    const requests = this.convertContentToRequests(content);
    
    try {
      await this.docs.documents.batchUpdate({
        documentId: documentId,
        requestBody: {
          requests: requests
        }
      });

      return { success: true, documentId };
    } catch (error) {
      console.error('Error updating document:', error);
      throw error;
    }
  }

  convertContentToRequests(content) {
    const requests = [];
    
    if (typeof content === 'string') {
      // Simple text insertion
      requests.push({
        insertText: {
          location: { index: 1 },
          text: content
        }
      });
    } else if (content.sections) {
      // Structured content with sections
      let currentIndex = 1;
      
      for (const [sectionName, sectionContent] of Object.entries(content.sections)) {
        // Add section heading
        const heading = `${sectionName.replace(/_/g, ' ').toUpperCase()}\n\n`;
        requests.push({
          insertText: {
            location: { index: currentIndex },
            text: heading
          }
        });
        
        // Style the heading
        requests.push({
          updateParagraphStyle: {
            range: {
              startIndex: currentIndex,
              endIndex: currentIndex + heading.length - 2
            },
            paragraphStyle: {
              namedStyleType: 'HEADING_1'
            },
            fields: 'namedStyleType'
          }
        });
        
        currentIndex += heading.length;
        
        // Add section content
        const contentText = `${sectionContent}\n\n`;
        requests.push({
          insertText: {
            location: { index: currentIndex },
            text: contentText
          }
        });
        
        currentIndex += contentText.length;
      }
    }
    
    return requests;
  }

  async createFolder(folderName, parentFolderId = null) {
    const fileMetadata = {
      name: folderName,
      mimeType: 'application/vnd.google-apps.folder'
    };

    if (parentFolderId) {
      fileMetadata.parents = [parentFolderId];
    }

    try {
      const response = await this.drive.files.create({
        resource: fileMetadata,
        fields: 'id, name, webViewLink'
      });

      return response.data;
    } catch (error) {
      console.error('Error creating folder:', error);
      throw error;
    }
  }

  async moveToFolder(fileId, folderId) {
    try {
      // Get current parents
      const file = await this.drive.files.get({
        fileId: fileId,
        fields: 'parents'
      });

      // Move the file to the new folder
      const previousParents = file.data.parents ? file.data.parents.join(',') : '';
      
      await this.drive.files.update({
        fileId: fileId,
        addParents: folderId,
        removeParents: previousParents,
        fields: 'id, parents'
      });

      return { success: true };
    } catch (error) {
      console.error('Error moving file:', error);
      throw error;
    }
  }

  async getDocument(documentId) {
    try {
      const response = await this.docs.documents.get({
        documentId: documentId
      });

      return response.data;
    } catch (error) {
      console.error('Error getting document:', error);
      throw error;
    }
  }

  async listDocuments(folderId = null) {
    try {
      let query = "mimeType='application/vnd.google-apps.document'";
      
      if (folderId) {
        query += ` and '${folderId}' in parents`;
      }

      const response = await this.drive.files.list({
        q: query,
        fields: 'files(id, name, modifiedTime, webViewLink)',
        orderBy: 'modifiedTime desc'
      });

      return response.data.files;
    } catch (error) {
      console.error('Error listing documents:', error);
      throw error;
    }
  }

  async createVersion(documentId, versionName) {
    try {
      // Create a copy of the document as a version
      const copyResponse = await this.drive.files.copy({
        fileId: documentId,
        requestBody: {
          name: versionName
        }
      });

      return copyResponse.data;
    } catch (error) {
      console.error('Error creating version:', error);
      throw error;
    }
  }

  async exportDocument(documentId, format = 'pdf') {
    const mimeTypes = {
      pdf: 'application/pdf',
      docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      html: 'text/html',
      txt: 'text/plain'
    };

    try {
      const response = await this.drive.files.export({
        fileId: documentId,
        mimeType: mimeTypes[format] || mimeTypes.pdf
      }, {
        responseType: 'stream'
      });

      return response.data;
    } catch (error) {
      console.error('Error exporting document:', error);
      throw error;
    }
  }

  async shareDocument(documentId, email, role = 'reader') {
    try {
      const response = await this.drive.permissions.create({
        fileId: documentId,
        requestBody: {
          type: 'user',
          role: role,
          emailAddress: email
        },
        sendNotificationEmail: true
      });

      return response.data;
    } catch (error) {
      console.error('Error sharing document:', error);
      throw error;
    }
  }

  async setupFolderStructure() {
    try {
      // Create main HABA Documents folder
      const mainFolder = await this.createFolder('HABA Documents');
      
      // Create subfolders
      const clientsFolder = await this.createFolder('Clients', mainFolder.id);
      const templatesFolder = await this.createFolder('Templates', mainFolder.id);
      const archiveFolder = await this.createFolder('Archive', mainFolder.id);
      
      // Create client folders
      const marlinkFolder = await this.createFolder('Marlink', clientsFolder.id);
      await this.createFolder('HLD', marlinkFolder.id);
      await this.createFolder('LLD', marlinkFolder.id);
      await this.createFolder('Supporting Documents', marlinkFolder.id);
      
      const allianzFolder = await this.createFolder('AllianzGI', clientsFolder.id);
      await this.createFolder('HLD', allianzFolder.id);
      await this.createFolder('LLD', allianzFolder.id);
      await this.createFolder('Supporting Documents', allianzFolder.id);
      
      // Create template folders
      await this.createFolder('HLD Templates', templatesFolder.id);
      await this.createFolder('LLD Templates', templatesFolder.id);
      
      return {
        mainFolderId: mainFolder.id,
        structure: {
          clients: clientsFolder.id,
          templates: templatesFolder.id,
          archive: archiveFolder.id
        }
      };
    } catch (error) {
      console.error('Error setting up folder structure:', error);
      throw error;
    }
  }
}

module.exports = GoogleDocsService;