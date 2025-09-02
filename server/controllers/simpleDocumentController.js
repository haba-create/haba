const DocumentService = require('../services/documentService');

class SimpleDocumentController {
  constructor() {
    this.documentService = new DocumentService();
  }

  async generateDocument(req, res) {
    try {
      const {
        documentType, // HLD, LLD, POWERPOINT, WORD, EXCEL
        client,
        projectName,
        requirements,
        author,
        template // Optional custom template
      } = req.body;

      // Validate input
      if (!documentType || !client || !projectName) {
        return res.status(400).json({
          error: 'Missing required fields: documentType, client, projectName'
        });
      }

      // Validate API keys are present
      if (['HLD', 'LLD'].includes(documentType.toUpperCase()) && !process.env.CLAUDE_API_KEY) {
        return res.status(500).json({
          error: 'Claude API key not configured. Please set CLAUDE_API_KEY environment variable.'
        });
      }

      if (['POWERPOINT', 'WORD', 'EXCEL'].includes(documentType.toUpperCase()) && !process.env.OPENAI_API_KEY) {
        return res.status(500).json({
          error: 'OpenAI API key not configured. Please set OPENAI_API_KEY environment variable.'
        });
      }

      // Build context for document generation
      const context = {
        client,
        projectName,
        author: author || req.user?.displayName || 'HABA Consulting',
        timestamp: new Date().toISOString()
      };

      // Generate document content using appropriate AI service
      console.log(`Generating ${documentType} document for ${client} - ${projectName}...`);
      
      const generatedContent = await this.documentService.generateDocument(
        documentType,
        requirements || {},
        context
      );

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
        status: 'generated'
      };

      // Save document to filesystem
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
          filename: saveResult.filename
        },
        content: generatedContent
      };

      res.json(response);
    } catch (error) {
      console.error('Error generating document:', error);
      res.status(500).json({
        error: 'Failed to generate document',
        details: error.message,
        type: error.name
      });
    }
  }

  async listDocuments(req, res) {
    try {
      const documents = await this.documentService.listGeneratedDocuments();
      
      res.json({
        success: true,
        documents: documents,
        total: documents.length
      });
    } catch (error) {
      console.error('Error listing documents:', error);
      res.status(500).json({
        error: 'Failed to list documents',
        details: error.message
      });
    }
  }

  async getTemplates(req, res) {
    try {
      const templates = await this.documentService.getTemplates();
      
      res.json({
        success: true,
        templates: templates
      });
    } catch (error) {
      console.error('Error getting templates:', error);
      res.status(500).json({
        error: 'Failed to retrieve templates',
        details: error.message
      });
    }
  }

  async getDocument(req, res) {
    try {
      const { documentId } = req.params;
      
      // For now, return from the list
      const documents = await this.documentService.listGeneratedDocuments();
      const document = documents.find(doc => doc.id === documentId);
      
      if (!document) {
        return res.status(404).json({
          error: 'Document not found'
        });
      }
      
      res.json({
        success: true,
        document
      });
    } catch (error) {
      console.error('Error getting document:', error);
      res.status(500).json({
        error: 'Failed to retrieve document',
        details: error.message
      });
    }
  }

  async downloadDocument(req, res) {
    try {
      const { documentId } = req.params;
      
      // Get document from the list
      const documents = await this.documentService.listGeneratedDocuments();
      const document = documents.find(doc => doc.id === documentId);
      
      if (!document) {
        return res.status(404).json({
          error: 'Document not found'
        });
      }
      
      // Set headers for download
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Content-Disposition', `attachment; filename="${document.title || documentId}.json"`);
      
      // Send the document content
      res.json(document);
    } catch (error) {
      console.error('Error downloading document:', error);
      res.status(500).json({
        error: 'Failed to download document',
        details: error.message
      });
    }
  }

  // Simplified test endpoint to verify services are working
  async testGeneration(req, res) {
    try {
      const testRequirements = {
        businessObjective: 'Test document generation',
        scope: 'Verify API integration'
      };

      const testContext = {
        client: 'TestClient',
        projectName: 'TestProject',
        author: 'System Test'
      };

      // Test Claude API (for HLD)
      let claudeTest = { status: 'not tested' };
      if (process.env.CLAUDE_API_KEY) {
        try {
          await this.documentService.generateDocument('HLD', testRequirements, testContext);
          claudeTest = { status: 'success', message: 'Claude API working' };
        } catch (error) {
          claudeTest = { status: 'failed', message: error.message };
        }
      } else {
        claudeTest = { status: 'skipped', message: 'Claude API key not configured' };
      }

      // Test OpenAI API (for PowerPoint)
      let openaiTest = { status: 'not tested' };
      if (process.env.OPENAI_API_KEY) {
        try {
          await this.documentService.generateDocument('POWERPOINT', testRequirements, testContext);
          openaiTest = { status: 'success', message: 'OpenAI API working' };
        } catch (error) {
          openaiTest = { status: 'failed', message: error.message };
        }
      } else {
        openaiTest = { status: 'skipped', message: 'OpenAI API key not configured' };
      }

      res.json({
        success: true,
        tests: {
          claude: claudeTest,
          openai: openaiTest
        },
        templates: await this.documentService.getTemplates()
      });
    } catch (error) {
      console.error('Test generation error:', error);
      res.status(500).json({
        error: 'Test failed',
        details: error.message
      });
    }
  }
}

module.exports = SimpleDocumentController;