const DocumentService = require('../services/documentService');
const OpenAIAgentService = require('../services/openaiAgentService');
const DocumentConverterService = require('../services/documentConverterService');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../../uploads');
    await fs.mkdir(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['.docx', '.pdf', '.txt', '.json', '.md'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Allowed: ' + allowedTypes.join(', ')));
    }
  }
}).single('template');

class EnhancedDocumentController {
  constructor() {
    this.documentService = new DocumentService();
    this.agentService = new OpenAIAgentService();
    this.converterService = new DocumentConverterService();
  }

  // Middleware for handling file uploads
  handleTemplateUpload(req, res, next) {
    upload(req, res, (err) => {
      if (err) {
        return res.status(400).json({
          error: 'File upload failed',
          details: err.message
        });
      }
      next();
    });
  }

  async generateAdvancedDocument(req, res) {
    try {
      const {
        documentType,
        client,
        projectName,
        requirements,
        author,
        outputFormat = 'json',
        useAgent = true
      } = req.body;

      // Parse template if uploaded
      let template = null;
      if (req.file) {
        template = await this.parseTemplate(req.file);
      } else if (req.body.template) {
        template = req.body.template;
      }

      // Validate input
      if (!documentType || !client || !projectName) {
        return res.status(400).json({
          error: 'Missing required fields: documentType, client, projectName'
        });
      }

      // Build context
      const context = {
        client,
        projectName,
        author: author || req.user?.displayName || 'HABA Consulting',
        timestamp: new Date().toISOString()
      };

      console.log(`Generating advanced ${documentType} document for ${client} - ${projectName}...`);

      let generatedContent;
      
      if (useAgent && this.agentService.assistantId) {
        // Use OpenAI Assistant with tools
        try {
          generatedContent = await this.agentService.generateDocumentWithAgent(
            documentType,
            requirements || {},
            context,
            template
          );
        } catch (agentError) {
          console.error('Agent generation failed, falling back to standard:', agentError);
          // Fallback to standard generation
          generatedContent = await this.documentService.generateDocument(
            documentType,
            requirements || {},
            context
          );
        }
      } else {
        // Use standard generation
        generatedContent = await this.documentService.generateDocument(
          documentType,
          requirements || {},
          context
        );
      }

      // Create document metadata
      const documentData = {
        id: `doc_${Date.now()}`,
        type: documentType.toUpperCase(),
        client: client,
        projectName: projectName,
        title: `${client}_${projectName}_${documentType}`,
        author: context.author,
        createdAt: context.timestamp,
        content: generatedContent,
        sections: generatedContent.sections || [],
        status: 'generated'
      };

      // Convert to requested format
      let outputFile = null;
      if (outputFormat !== 'json') {
        try {
          outputFile = await this.converterService.convertDocument(
            documentData,
            outputFormat,
            documentData.title
          );
        } catch (conversionError) {
          console.error('Document conversion failed:', conversionError);
          // Continue with JSON output
        }
      }

      // Save document metadata
      const saveResult = await this.documentService.saveGeneratedDocument(documentData);

      // Prepare response
      const response = {
        success: true,
        document: {
          id: documentData.id,
          title: documentData.title,
          type: documentData.type,
          client: documentData.client,
          project: documentData.projectName,
          createdAt: documentData.createdAt,
          author: documentData.author,
          filename: saveResult.filename,
          outputFormat: outputFile ? outputFile.format : 'json',
          downloadUrl: outputFile ? `/api/v3/documents/${documentData.id}/download?format=${outputFile.format}` : null
        },
        content: generatedContent,
        outputFile: outputFile
      };

      // Clean up uploaded template file if exists
      if (req.file) {
        await fs.unlink(req.file.path).catch(console.error);
      }

      res.json(response);
    } catch (error) {
      console.error('Error generating advanced document:', error);
      res.status(500).json({
        error: 'Failed to generate document',
        details: error.message,
        type: error.name
      });
    }
  }

  async parseTemplate(file) {
    try {
      const content = await fs.readFile(file.path, 'utf-8');
      
      // Try to parse as JSON
      try {
        return JSON.parse(content);
      } catch {
        // If not JSON, return as text template
        return content;
      }
    } catch (error) {
      console.error('Error parsing template:', error);
      return null;
    }
  }

  async convertDocument(req, res) {
    try {
      const { documentId } = req.params;
      const { format } = req.query;

      if (!format) {
        return res.status(400).json({
          error: 'Format parameter is required'
        });
      }

      // Get document
      const documents = await this.documentService.listGeneratedDocuments();
      const document = documents.find(doc => doc.id === documentId);

      if (!document) {
        return res.status(404).json({
          error: 'Document not found'
        });
      }

      // Convert document
      const result = await this.converterService.convertDocument(
        document,
        format,
        document.title || documentId
      );

      res.json({
        success: true,
        ...result,
        downloadUrl: `/api/v3/documents/${documentId}/file/${result.filename}`
      });
    } catch (error) {
      console.error('Error converting document:', error);
      res.status(500).json({
        error: 'Failed to convert document',
        details: error.message
      });
    }
  }

  async downloadConvertedDocument(req, res) {
    try {
      const { documentId } = req.params;
      const { format = 'json' } = req.query;

      // Get document
      const documents = await this.documentService.listGeneratedDocuments();
      const document = documents.find(doc => doc.id === documentId);

      if (!document) {
        return res.status(404).json({
          error: 'Document not found'
        });
      }

      if (format === 'json') {
        // Return JSON directly
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-Disposition', `attachment; filename="${document.title || documentId}.json"`);
        res.json(document);
      } else {
        // Convert and send file
        const result = await this.converterService.convertDocument(
          document,
          format,
          document.title || documentId
        );

        // Send the file
        res.download(result.path, result.filename, (err) => {
          if (err) {
            console.error('Error sending file:', err);
            res.status(500).json({
              error: 'Failed to download file',
              details: err.message
            });
          }
        });
      }
    } catch (error) {
      console.error('Error downloading document:', error);
      res.status(500).json({
        error: 'Failed to download document',
        details: error.message
      });
    }
  }

  async generateImage(req, res) {
    try {
      const { prompt, size = '1024x1024' } = req.body;

      if (!prompt) {
        return res.status(400).json({
          error: 'Prompt is required'
        });
      }

      const imageUrl = await this.agentService.generateImage(prompt, size);

      res.json({
        success: true,
        imageUrl,
        prompt
      });
    } catch (error) {
      console.error('Error generating image:', error);
      res.status(500).json({
        error: 'Failed to generate image',
        details: error.message
      });
    }
  }

  async getTemplates(req, res) {
    try {
      const templates = await this.documentService.getTemplates();
      
      // Add format options for each template
      const enhancedTemplates = templates.map(template => ({
        ...template,
        availableFormats: ['json', 'pdf', 'docx', 'pptx', 'xlsx'],
        supportsAgent: true,
        features: {
          codeInterpreter: true,
          imageGeneration: true,
          webSearch: false // Would need to implement
        }
      }));

      res.json({
        success: true,
        templates: enhancedTemplates
      });
    } catch (error) {
      console.error('Error getting templates:', error);
      res.status(500).json({
        error: 'Failed to retrieve templates',
        details: error.message
      });
    }
  }

  async listDocuments(req, res) {
    try {
      const documents = await this.documentService.listGeneratedDocuments();
      
      // Add available formats for each document
      const enhancedDocuments = documents.map(doc => ({
        ...doc,
        availableFormats: ['json', 'pdf', 'docx', 'pptx', 'xlsx'],
        downloadUrls: {
          json: `/api/v3/documents/${doc.id}/download?format=json`,
          pdf: `/api/v3/documents/${doc.id}/download?format=pdf`,
          docx: `/api/v3/documents/${doc.id}/download?format=docx`,
          pptx: `/api/v3/documents/${doc.id}/download?format=pptx`,
          xlsx: `/api/v3/documents/${doc.id}/download?format=xlsx`
        }
      }));

      res.json({
        success: true,
        documents: enhancedDocuments,
        total: enhancedDocuments.length
      });
    } catch (error) {
      console.error('Error listing documents:', error);
      res.status(500).json({
        error: 'Failed to list documents',
        details: error.message
      });
    }
  }
}

module.exports = EnhancedDocumentController;