const axios = require('axios');

class ClaudeService {
  constructor() {
    this.apiKey = process.env.CLAUDE_API_KEY;
    this.apiUrl = 'https://api.anthropic.com/v1/messages';
    this.model = 'claude-3-opus-20240229';
  }

  async generateDocument(type, requirements, context) {
    const prompt = this.buildPrompt(type, requirements, context);
    
    try {
      const response = await axios.post(
        this.apiUrl,
        {
          model: this.model,
          max_tokens: 4000,
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': this.apiKey,
            'anthropic-version': '2023-06-01'
          }
        }
      );

      return this.parseResponse(response.data);
    } catch (error) {
      console.error('Claude API Error:', error);
      throw new Error('Failed to generate document content');
    }
  }

  buildPrompt(type, requirements, context) {
    const templates = {
      HLD: `You are an expert Enterprise Architect creating a High-Level Design (HLD) document.
        
        Create a professional HLD document with the following requirements:
        ${JSON.stringify(requirements, null, 2)}
        
        Context about the project:
        ${JSON.stringify(context, null, 2)}
        
        The document should follow IEEE and TOGAF standards and include:
        1. Executive Summary
        2. System Architecture Overview
        3. Component Architecture
        4. Technology Stack
        5. Integration Architecture
        6. Security Architecture
        7. Deployment Architecture
        8. Performance and Scalability
        9. Risk Assessment
        10. Glossary
        
        Format the response as a structured document with clear sections and professional language.`,
      
      LLD: `You are an expert Solution Architect creating a Low-Level Design (LLD) document.
        
        Create a detailed LLD document with the following requirements:
        ${JSON.stringify(requirements, null, 2)}
        
        Context about the project:
        ${JSON.stringify(context, null, 2)}
        
        The document should include:
        1. Component Specifications
        2. API Specifications (OpenAPI format)
        3. Database Design (Schema, Indexes, Relationships)
        4. Sequence Diagrams (PlantUML notation)
        5. Class Diagrams
        6. Error Handling Strategy
        7. Logging and Monitoring
        8. Configuration Management
        9. Testing Strategy
        10. Implementation Guidelines
        
        Provide detailed technical specifications with code examples where appropriate.`
    };

    return templates[type] || templates.HLD;
  }

  parseResponse(response) {
    const content = response.content[0].text;
    
    // Parse the content into structured sections
    const sections = this.extractSections(content);
    
    return {
      raw: content,
      sections: sections,
      metadata: {
        model: this.model,
        timestamp: new Date().toISOString(),
        tokens_used: response.usage?.total_tokens || 0
      }
    };
  }

  extractSections(content) {
    const sections = {};
    const lines = content.split('\n');
    let currentSection = 'introduction';
    let sectionContent = [];

    for (const line of lines) {
      if (line.match(/^#+\s+(.+)$/)) {
        if (sectionContent.length > 0) {
          sections[currentSection] = sectionContent.join('\n').trim();
        }
        currentSection = line.replace(/^#+\s+/, '').toLowerCase().replace(/\s+/g, '_');
        sectionContent = [];
      } else {
        sectionContent.push(line);
      }
    }

    if (sectionContent.length > 0) {
      sections[currentSection] = sectionContent.join('\n').trim();
    }

    return sections;
  }

  async enhanceDocument(documentContent, enhancementType) {
    const enhancementPrompts = {
      clarity: 'Improve the clarity and readability of this document while maintaining technical accuracy.',
      compliance: 'Review this document for compliance with IEEE and TOGAF standards and suggest improvements.',
      technical: 'Add more technical depth and implementation details to this document.',
      executive: 'Create an executive summary highlighting key decisions and business value.'
    };

    const prompt = `${enhancementPrompts[enhancementType] || enhancementPrompts.clarity}
    
    Document to enhance:
    ${documentContent}`;

    return this.generateDocument('enhancement', { type: enhancementType }, { content: documentContent });
  }
}

module.exports = ClaudeService;