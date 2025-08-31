const ClaudeService = require('../services/claudeService');
const GoogleDocsService = require('../services/googleDocsService');
const VersioningService = require('../services/versioningService');
const fs = require('fs').promises;
const path = require('path');

class DocumentController {
  constructor() {
    this.claudeService = new ClaudeService();
    this.googleDocsService = new GoogleDocsService();
    this.versioningService = new VersioningService();
    this.templates = new Map();
    this.loadTemplates();
  }

  async loadTemplates() {
    try {
      const hldTemplate = await fs.readFile(
        path.join(__dirname, '../templates/hld-template.json'),
        'utf-8'
      );
      const lldTemplate = await fs.readFile(
        path.join(__dirname, '../templates/lld-template.json'),
        'utf-8'
      );
      
      this.templates.set('HLD', JSON.parse(hldTemplate));
      this.templates.set('LLD', JSON.parse(lldTemplate));
    } catch (error) {
      console.error('Error loading templates:', error);
    }
  }

  async generateDocument(req, res) {
    try {
      const {
        documentType, // HLD or LLD
        client,
        projectName,
        requirements,
        author
      } = req.body;

      // Validate input
      if (!documentType || !client || !projectName) {
        return res.status(400).json({
          error: 'Missing required fields: documentType, client, projectName'
        });
      }

      // Get template
      const template = this.templates.get(documentType);
      if (!template) {
        return res.status(400).json({
          error: `Invalid document type: ${documentType}`
        });
      }

      // Build context for Claude
      const context = {
        client,
        projectName,
        template: template.sections,
        standards: documentType === 'HLD' 
          ? ['IEEE 42010', 'TOGAF', 'ISO/IEC 25010']
          : ['IEEE 1016', 'UML 2.5', 'OpenAPI 3.0'],
        author: author || req.user?.displayName || 'System'
      };

      // Generate content with Claude
      console.log('Generating content with Claude API...');
      const generatedContent = await this.claudeService.generateDocument(
        documentType,
        requirements,
        context
      );

      // Create document title
      const timestamp = new Date().toISOString().split('T')[0];
      const documentTitle = `${client}_${projectName}_${documentType}_${timestamp}`;

      // Create or get folder structure
      const folders = await this.getOrCreateFolderStructure(client, documentType);

      // Create Google Doc
      console.log('Creating Google Doc...');
      const googleDoc = await this.googleDocsService.createDocument(
        documentTitle,
        generatedContent,
        folders.documentFolder
      );

      // Create initial version
      const version = this.versioningService.addVersion(googleDoc.documentId, {
        version: '1.0.0',
        author: context.author,
        changes: [{
          type: 'creation',
          description: 'Initial document creation'
        }],
        documentSnapshot: generatedContent,
        googleDocId: googleDoc.documentId,
        changeType: 'major'
      });

      // Prepare response
      const response = {
        success: true,
        document: {
          id: googleDoc.documentId,
          title: documentTitle,
          type: documentType,
          client: client,
          project: projectName,
          webViewLink: googleDoc.webViewLink,
          version: version.version,
          createdAt: version.timestamp,
          author: context.author
        },
        content: {
          sections: generatedContent.sections,
          metadata: generatedContent.metadata
        }
      };

      res.json(response);
    } catch (error) {
      console.error('Error generating document:', error);
      res.status(500).json({
        error: 'Failed to generate document',
        details: error.message
      });
    }
  }

  async updateDocument(req, res) {
    try {
      const { documentId } = req.params;
      const {
        updates,
        changeType = 'patch',
        author,
        reason
      } = req.body;

      // Get current document from Google Docs
      const currentDoc = await this.googleDocsService.getDocument(documentId);
      
      // Get current version
      const currentVersion = this.versioningService.getCurrentVersion(documentId);

      // Generate updated content with Claude
      const enhancedContent = await this.claudeService.enhanceDocument(
        currentDoc,
        updates.enhancementType || 'clarity'
      );

      // Update Google Doc
      await this.googleDocsService.updateDocument(documentId, enhancedContent);

      // Create new version
      const newVersion = this.versioningService.addVersion(documentId, {
        changeType,
        author: author || req.user?.displayName || 'System',
        changes: updates.changes || [{
          type: 'update',
          description: reason || 'Document updated'
        }],
        documentSnapshot: enhancedContent,
        googleDocId: documentId
      });

      res.json({
        success: true,
        document: {
          id: documentId,
          previousVersion: currentVersion,
          newVersion: newVersion.version,
          updatedAt: newVersion.timestamp
        }
      });
    } catch (error) {
      console.error('Error updating document:', error);
      res.status(500).json({
        error: 'Failed to update document',
        details: error.message
      });
    }
  }

  async getDocument(req, res) {
    try {
      const { documentId } = req.params;
      const { version } = req.query;

      let document;
      if (version) {
        // Get specific version
        const versionData = this.versioningService.getVersion(documentId, version);
        if (!versionData) {
          return res.status(404).json({ error: 'Version not found' });
        }
        document = await this.googleDocsService.getDocument(versionData.googleDocId);
      } else {
        // Get latest version
        document = await this.googleDocsService.getDocument(documentId);
      }

      const versionHistory = this.versioningService.getVersionHistory(documentId);

      res.json({
        document,
        versions: versionHistory,
        currentVersion: this.versioningService.getCurrentVersion(documentId)
      });
    } catch (error) {
      console.error('Error getting document:', error);
      res.status(500).json({
        error: 'Failed to retrieve document',
        details: error.message
      });
    }
  }

  async listDocuments(req, res) {
    try {
      const { client, type, folderId } = req.query;
      
      let documents = await this.googleDocsService.listDocuments(folderId);
      
      // Filter by client if specified
      if (client) {
        documents = documents.filter(doc => 
          doc.name.toLowerCase().includes(client.toLowerCase())
        );
      }
      
      // Filter by type if specified
      if (type) {
        documents = documents.filter(doc => 
          doc.name.includes(type)
        );
      }

      // Add version information
      const documentsWithVersions = documents.map(doc => {
        const currentVersion = this.versioningService.getCurrentVersion(doc.id);
        return {
          ...doc,
          currentVersion,
          hasVersions: this.versioningService.getVersionHistory(doc.id).length > 0
        };
      });

      res.json({
        documents: documentsWithVersions,
        total: documentsWithVersions.length
      });
    } catch (error) {
      console.error('Error listing documents:', error);
      res.status(500).json({
        error: 'Failed to list documents',
        details: error.message
      });
    }
  }

  async compareVersions(req, res) {
    try {
      const { documentId } = req.params;
      const { version1, version2 } = req.query;

      if (!version1 || !version2) {
        return res.status(400).json({
          error: 'Both version1 and version2 parameters are required'
        });
      }

      const comparison = this.versioningService.compareVersions(
        documentId,
        version1,
        version2
      );

      res.json(comparison);
    } catch (error) {
      console.error('Error comparing versions:', error);
      res.status(500).json({
        error: 'Failed to compare versions',
        details: error.message
      });
    }
  }

  async approveVersion(req, res) {
    try {
      const { documentId, version } = req.params;
      const approvedBy = req.user?.displayName || 'System';

      const approvedVersion = this.versioningService.approveVersion(
        documentId,
        version,
        approvedBy
      );

      res.json({
        success: true,
        version: approvedVersion
      });
    } catch (error) {
      console.error('Error approving version:', error);
      res.status(500).json({
        error: 'Failed to approve version',
        details: error.message
      });
    }
  }

  async rollbackVersion(req, res) {
    try {
      const { documentId } = req.params;
      const { targetVersion } = req.body;

      const rollbackVersion = this.versioningService.rollbackToVersion(
        documentId,
        targetVersion
      );

      // Get the content from the target version
      const targetVersionData = this.versioningService.getVersion(
        documentId,
        targetVersion
      );

      // Update the Google Doc with the rolled-back content
      await this.googleDocsService.updateDocument(
        documentId,
        targetVersionData.documentSnapshot
      );

      res.json({
        success: true,
        newVersion: rollbackVersion,
        rolledBackTo: targetVersion
      });
    } catch (error) {
      console.error('Error rolling back version:', error);
      res.status(500).json({
        error: 'Failed to rollback version',
        details: error.message
      });
    }
  }

  async exportDocument(req, res) {
    try {
      const { documentId } = req.params;
      const { format = 'pdf' } = req.query;

      const exportStream = await this.googleDocsService.exportDocument(
        documentId,
        format
      );

      // Set appropriate headers
      const contentTypes = {
        pdf: 'application/pdf',
        docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        html: 'text/html',
        txt: 'text/plain'
      };

      res.setHeader('Content-Type', contentTypes[format] || contentTypes.pdf);
      res.setHeader(
        'Content-Disposition',
        `attachment; filename="document.${format}"`
      );

      exportStream.pipe(res);
    } catch (error) {
      console.error('Error exporting document:', error);
      res.status(500).json({
        error: 'Failed to export document',
        details: error.message
      });
    }
  }

  async shareDocument(req, res) {
    try {
      const { documentId } = req.params;
      const { email, role = 'reader' } = req.body;

      const permission = await this.googleDocsService.shareDocument(
        documentId,
        email,
        role
      );

      res.json({
        success: true,
        permission
      });
    } catch (error) {
      console.error('Error sharing document:', error);
      res.status(500).json({
        error: 'Failed to share document',
        details: error.message
      });
    }
  }

  async getOrCreateFolderStructure(client, documentType) {
    // This would typically check if folders exist and create them if not
    // For now, returning mock folder IDs
    return {
      clientFolder: `folder_${client.toLowerCase()}`,
      documentFolder: `folder_${client.toLowerCase()}_${documentType.toLowerCase()}`
    };
  }

  async setupInitialFolders(req, res) {
    try {
      const folderStructure = await this.googleDocsService.setupFolderStructure();
      
      res.json({
        success: true,
        message: 'Folder structure created successfully',
        folders: folderStructure
      });
    } catch (error) {
      console.error('Error setting up folders:', error);
      res.status(500).json({
        error: 'Failed to setup folder structure',
        details: error.message
      });
    }
  }

  async getTemplates(req, res) {
    try {
      const templates = Array.from(this.templates.entries()).map(([key, value]) => ({
        type: key,
        name: value.name,
        version: value.version,
        sections: value.sections.map(s => ({
          id: s.id,
          title: s.title,
          required: s.required
        }))
      }));

      res.json({ templates });
    } catch (error) {
      console.error('Error getting templates:', error);
      res.status(500).json({
        error: 'Failed to retrieve templates',
        details: error.message
      });
    }
  }
}

module.exports = DocumentController;