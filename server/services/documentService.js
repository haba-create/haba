const ClaudeService = require('./claudeService');
const OpenAIService = require('./openaiService');
const fs = require('fs').promises;
const path = require('path');

class DocumentService {
  constructor() {
    this.claudeService = new ClaudeService();
    this.openaiService = new OpenAIService();
    this.templates = new Map();
    this.loadTemplates();
  }

  async loadTemplates() {
    try {
      // Load existing templates
      const templatesDir = path.join(__dirname, '../templates');
      
      // Check if templates directory exists
      try {
        await fs.access(templatesDir);
      } catch {
        // Create templates directory if it doesn't exist
        await fs.mkdir(templatesDir, { recursive: true });
        await this.createDefaultTemplates();
      }

      // Load HLD template if exists
      try {
        const hldTemplate = await fs.readFile(
          path.join(templatesDir, 'hld-template.json'),
          'utf-8'
        );
        this.templates.set('HLD', JSON.parse(hldTemplate));
      } catch (error) {
        console.log('HLD template not found, using default');
        this.templates.set('HLD', this.getDefaultHLDTemplate());
      }

      // Load LLD template if exists
      try {
        const lldTemplate = await fs.readFile(
          path.join(templatesDir, 'lld-template.json'),
          'utf-8'
        );
        this.templates.set('LLD', JSON.parse(lldTemplate));
      } catch (error) {
        console.log('LLD template not found, using default');
        this.templates.set('LLD', this.getDefaultLLDTemplate());
      }

      // Add templates for Office documents
      this.templates.set('POWERPOINT', this.getDefaultPowerPointTemplate());
      this.templates.set('WORD', this.getDefaultWordTemplate());
      this.templates.set('EXCEL', this.getDefaultExcelTemplate());

    } catch (error) {
      console.error('Error loading templates:', error);
    }
  }

  async createDefaultTemplates() {
    const templatesDir = path.join(__dirname, '../templates');
    
    // Create default HLD template
    await fs.writeFile(
      path.join(templatesDir, 'hld-template.json'),
      JSON.stringify(this.getDefaultHLDTemplate(), null, 2)
    );

    // Create default LLD template
    await fs.writeFile(
      path.join(templatesDir, 'lld-template.json'),
      JSON.stringify(this.getDefaultLLDTemplate(), null, 2)
    );
  }

  getDefaultHLDTemplate() {
    return {
      name: 'High-Level Design Template',
      version: '1.0.0',
      sections: [
        { id: 'exec-summary', title: 'Executive Summary', required: true },
        { id: 'objectives', title: 'Business Objectives', required: true },
        { id: 'architecture', title: 'System Architecture', required: true },
        { id: 'components', title: 'Component Overview', required: true },
        { id: 'tech-stack', title: 'Technology Stack', required: true },
        { id: 'security', title: 'Security Architecture', required: false },
        { id: 'deployment', title: 'Deployment Strategy', required: false },
        { id: 'risks', title: 'Risks & Mitigations', required: false }
      ]
    };
  }

  getDefaultLLDTemplate() {
    return {
      name: 'Low-Level Design Template',
      version: '1.0.0',
      sections: [
        { id: 'overview', title: 'Technical Overview', required: true },
        { id: 'components', title: 'Component Details', required: true },
        { id: 'api-spec', title: 'API Specifications', required: true },
        { id: 'database', title: 'Database Design', required: true },
        { id: 'algorithms', title: 'Core Algorithms', required: false },
        { id: 'error-handling', title: 'Error Handling', required: true },
        { id: 'performance', title: 'Performance Optimization', required: false },
        { id: 'testing', title: 'Testing Strategy', required: true }
      ]
    };
  }

  getDefaultPowerPointTemplate() {
    return {
      name: 'PowerPoint Presentation Template',
      version: '1.0.0',
      slides: [
        { id: 'title', title: 'Title Slide', layout: 'title' },
        { id: 'agenda', title: 'Agenda', layout: 'bullets' },
        { id: 'problem', title: 'Problem Statement', layout: 'content' },
        { id: 'solution', title: 'Proposed Solution', layout: 'content' },
        { id: 'benefits', title: 'Benefits', layout: 'bullets' },
        { id: 'timeline', title: 'Implementation Timeline', layout: 'timeline' },
        { id: 'next-steps', title: 'Next Steps', layout: 'bullets' }
      ]
    };
  }

  getDefaultWordTemplate() {
    return {
      name: 'Word Document Template',
      version: '1.0.0',
      sections: [
        { id: 'cover', title: 'Cover Page', level: 0 },
        { id: 'toc', title: 'Table of Contents', level: 0 },
        { id: 'summary', title: 'Executive Summary', level: 1 },
        { id: 'introduction', title: 'Introduction', level: 1 },
        { id: 'content', title: 'Main Content', level: 1 },
        { id: 'conclusion', title: 'Conclusion', level: 1 },
        { id: 'appendix', title: 'Appendices', level: 1 }
      ]
    };
  }

  getDefaultExcelTemplate() {
    return {
      name: 'Excel Spreadsheet Template',
      version: '1.0.0',
      sheets: [
        { id: 'summary', name: 'Summary Dashboard', type: 'dashboard' },
        { id: 'data', name: 'Data Input', type: 'data' },
        { id: 'calculations', name: 'Calculations', type: 'formulas' },
        { id: 'charts', name: 'Charts', type: 'visualizations' }
      ]
    };
  }

  async generateDocument(type, requirements, context) {
    // Determine which service to use based on document type
    const documentType = type.toUpperCase();
    
    // Get template if available
    const template = this.templates.get(documentType);
    
    // Route to appropriate service
    // NOTE: Using OpenAI for all document types due to Claude API model access issues
    // You can switch back to Claude for HLD/LLD once model access is resolved
    
    if (process.env.CLAUDE_API_KEY && process.env.USE_CLAUDE_FOR_DOCS === 'true' && (documentType === 'HLD' || documentType === 'LLD')) {
      // Use Claude for Google Docs (HLD/LLD) if explicitly enabled
      console.log(`Using Claude API for ${documentType} generation...`);
      return await this.claudeService.generateDocument(documentType, requirements, context);
    } else if (['HLD', 'LLD', 'POWERPOINT', 'WORD', 'EXCEL'].includes(documentType)) {
      // Use OpenAI for all documents (fallback)
      console.log(`Using OpenAI API for ${documentType} generation...`);
      
      // Convert HLD/LLD to use OpenAI format
      const openAIType = ['HLD', 'LLD'].includes(documentType) ? 'word' : documentType.toLowerCase();
      
      return await this.openaiService.generateDocument(
        openAIType, 
        requirements, 
        context, 
        template
      );
    } else {
      throw new Error(`Unsupported document type: ${type}`);
    }
  }

  async getTemplates() {
    return Array.from(this.templates.entries()).map(([key, value]) => ({
      type: key,
      name: value.name,
      version: value.version,
      sections: value.sections || value.slides || value.sheets
    }));
  }

  async saveGeneratedDocument(documentData) {
    // Save document metadata and content
    const timestamp = new Date().toISOString();
    const filename = `${documentData.client}_${documentData.projectName}_${documentData.type}_${timestamp}.json`;
    
    const documentsDir = path.join(__dirname, '../../generated_documents');
    
    try {
      await fs.mkdir(documentsDir, { recursive: true });
      await fs.writeFile(
        path.join(documentsDir, filename),
        JSON.stringify(documentData, null, 2)
      );
      
      return {
        success: true,
        filename,
        path: path.join(documentsDir, filename)
      };
    } catch (error) {
      console.error('Error saving document:', error);
      throw error;
    }
  }

  async listGeneratedDocuments() {
    const documentsDir = path.join(__dirname, '../../generated_documents');
    
    try {
      await fs.mkdir(documentsDir, { recursive: true });
      const files = await fs.readdir(documentsDir);
      
      const documents = [];
      for (const file of files) {
        if (file.endsWith('.json')) {
          const content = await fs.readFile(
            path.join(documentsDir, file),
            'utf-8'
          );
          documents.push({
            filename: file,
            ...JSON.parse(content)
          });
        }
      }
      
      return documents.sort((a, b) => 
        new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      );
    } catch (error) {
      console.error('Error listing documents:', error);
      return [];
    }
  }
}

module.exports = DocumentService;