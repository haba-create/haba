const axios = require('axios');

class OpenAIService {
  constructor() {
    this.apiKey = process.env.OPENAI_API_KEY;
    this.apiUrl = 'https://api.openai.com/v1/chat/completions';
    this.model = process.env.OPENAI_MODEL || 'gpt-4-turbo-preview';
  }

  async generateDocument(type, requirements, context, template = null) {
    const prompt = this.buildPrompt(type, requirements, context, template);
    
    try {
      console.log(`Generating ${type} document with OpenAI...`);
      
      const response = await axios.post(
        this.apiUrl,
        {
          model: this.model,
          messages: [
            {
              role: 'system',
              content: 'You are an expert document creator specializing in professional business documents, presentations, and spreadsheets.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 4000
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`
          }
        }
      );

      return this.parseResponse(response.data, type);
    } catch (error) {
      console.error('OpenAI API Error:', error.response?.data || error.message);
      throw new Error(`Failed to generate ${type} document: ${error.message}`);
    }
  }

  buildPrompt(type, requirements, context, template) {
    const documentTypes = {
      'powerpoint': this.buildPowerPointPrompt,
      'word': this.buildWordPrompt,
      'excel': this.buildExcelPrompt
    };

    const promptBuilder = documentTypes[type.toLowerCase()];
    if (!promptBuilder) {
      throw new Error(`Unsupported document type: ${type}`);
    }

    return promptBuilder.call(this, requirements, context, template);
  }

  buildPowerPointPrompt(requirements, context, template) {
    let prompt = `Create a professional PowerPoint presentation with the following requirements:
    
    Client: ${context.client}
    Project: ${context.projectName}
    
    Requirements:
    ${JSON.stringify(requirements, null, 2)}
    `;

    if (template) {
      prompt += `
      
      Use this template structure:
      ${JSON.stringify(template, null, 2)}
      `;
    } else {
      prompt += `
      
      Include these slides:
      1. Title Slide - Project name, client, date
      2. Executive Summary - Key points and objectives
      3. Problem Statement - Current challenges
      4. Proposed Solution - Your approach
      5. Implementation Plan - Timeline and milestones
      6. Benefits & ROI - Value proposition
      7. Technical Architecture (if applicable)
      8. Next Steps - Action items
      9. Q&A Slide
      
      Format the response as a JSON object with:
      - slides: array of slide objects
      - Each slide should have: title, content (bullet points or text), notes, layout
      `;
    }

    return prompt;
  }

  buildWordPrompt(requirements, context, template) {
    let prompt = `Create a professional Word document with the following requirements:
    
    Client: ${context.client}
    Project: ${context.projectName}
    Author: ${context.author || 'HABA Consulting'}
    
    Requirements:
    ${JSON.stringify(requirements, null, 2)}
    `;

    if (template) {
      prompt += `
      
      Use this template structure:
      ${JSON.stringify(template, null, 2)}
      `;
    } else {
      prompt += `
      
      Create a structured document with:
      1. Cover Page
      2. Table of Contents
      3. Executive Summary
      4. Introduction
      5. Main Content Sections
      6. Conclusion
      7. Appendices (if needed)
      
      Format the response as a JSON object with:
      - sections: array of section objects
      - Each section should have: title, content, level (1-3 for heading levels)
      `;
    }

    return prompt;
  }

  buildExcelPrompt(requirements, context, template) {
    let prompt = `Create a professional Excel spreadsheet structure with the following requirements:
    
    Client: ${context.client}
    Project: ${context.projectName}
    
    Requirements:
    ${JSON.stringify(requirements, null, 2)}
    `;

    if (template) {
      prompt += `
      
      Use this template structure:
      ${JSON.stringify(template, null, 2)}
      `;
    } else {
      prompt += `
      
      Create spreadsheet with:
      1. Summary Dashboard sheet
      2. Data Input sheet
      3. Calculations sheet
      4. Charts/Visualizations sheet
      
      Format the response as a JSON object with:
      - sheets: array of sheet objects
      - Each sheet should have: name, columns, sampleData, formulas (if any)
      `;
    }

    return prompt;
  }

  parseResponse(response, type) {
    try {
      const content = response.choices[0].message.content;
      
      // Try to parse as JSON first
      try {
        return JSON.parse(content);
      } catch {
        // If not JSON, structure it appropriately
        return this.structureContent(content, type);
      }
    } catch (error) {
      console.error('Error parsing OpenAI response:', error);
      throw new Error('Failed to parse document content');
    }
  }

  structureContent(content, type) {
    // Structure raw text content into appropriate format
    const lines = content.split('\n').filter(line => line.trim());
    
    if (type === 'powerpoint') {
      return {
        slides: this.parseSlides(lines)
      };
    } else if (type === 'word') {
      return {
        sections: this.parseSections(lines)
      };
    } else if (type === 'excel') {
      return {
        sheets: this.parseSheets(lines)
      };
    }
    
    return { content };
  }

  parseSlides(lines) {
    const slides = [];
    let currentSlide = null;

    for (const line of lines) {
      if (line.match(/^slide \d+/i) || line.match(/^\d+\./)) {
        if (currentSlide) slides.push(currentSlide);
        currentSlide = {
          title: line.replace(/^(slide \d+:?|\d+\.)\s*/i, ''),
          content: [],
          notes: ''
        };
      } else if (currentSlide) {
        currentSlide.content.push(line.trim());
      }
    }

    if (currentSlide) slides.push(currentSlide);
    return slides;
  }

  parseSections(lines) {
    const sections = [];
    let currentSection = null;

    for (const line of lines) {
      if (line.match(/^#+\s/) || line.match(/^\d+\./)) {
        if (currentSection) sections.push(currentSection);
        const level = (line.match(/^#+/) || [''])[0].length || 1;
        currentSection = {
          title: line.replace(/^(#+|\d+\.)\s*/, ''),
          content: [],
          level
        };
      } else if (currentSection) {
        currentSection.content.push(line.trim());
      }
    }

    if (currentSection) sections.push(currentSection);
    return sections;
  }

  parseSheets(lines) {
    // Simple parsing for Excel structure
    return [{
      name: 'Main',
      columns: ['A', 'B', 'C', 'D'],
      sampleData: lines
    }];
  }

  async generateSpreadsheetData(requirements) {
    // Generate structured data for spreadsheets
    const prompt = `Generate sample data and formulas for a spreadsheet based on these requirements:
    ${JSON.stringify(requirements, null, 2)}
    
    Return as JSON with sheets, columns, and sample data.`;

    try {
      const response = await axios.post(
        this.apiUrl,
        {
          model: this.model,
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.5,
          max_tokens: 2000
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`
          }
        }
      );

      return this.parseResponse(response.data, 'excel');
    } catch (error) {
      console.error('Error generating spreadsheet data:', error);
      throw error;
    }
  }
}

module.exports = OpenAIService;