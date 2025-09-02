const axios = require('axios');
const OpenAI = require('openai');
const fs = require('fs').promises;
const path = require('path');

class OpenAIAgentService {
  constructor() {
    this.apiKey = process.env.OPENAI_API_KEY;
    if (!this.apiKey) {
      console.warn('OpenAI API key not configured');
      return;
    }
    
    this.openai = new OpenAI({
      apiKey: this.apiKey
    });
    
    this.assistantId = null;
    this.initializeAssistant();
  }

  async initializeAssistant() {
    try {
      // Create or retrieve the document generation assistant
      const assistants = await this.openai.beta.assistants.list();
      const existingAssistant = assistants.data.find(a => a.name === 'HABA Document Generator');
      
      if (existingAssistant) {
        this.assistantId = existingAssistant.id;
        console.log('Using existing assistant:', this.assistantId);
      } else {
        const assistant = await this.openai.beta.assistants.create({
          name: 'HABA Document Generator',
          instructions: this.getSystemPrompt(),
          model: 'gpt-4-turbo-preview',
          tools: [
            { type: 'code_interpreter' },
            { type: 'retrieval' }
          ]
        });
        this.assistantId = assistant.id;
        console.log('Created new assistant:', this.assistantId);
      }
    } catch (error) {
      console.error('Error initializing assistant:', error);
    }
  }

  getSystemPrompt() {
    return `You are an expert document generator for HABA Consulting, specializing in creating professional technical and business documents.

Your capabilities:
1. Generate comprehensive documents based on templates and requirements
2. Use code interpreter for data analysis, calculations, and chart generation
3. Create visual diagrams and flowcharts when needed
4. Search for relevant information to enrich documents
5. Adapt content to match specific industry standards (IEEE, TOGAF, etc.)

Document Generation Process:
1. Analyze the provided template structure
2. Understand the client context and requirements
3. Generate high-quality, professional content
4. Include relevant diagrams, charts, and visualizations
5. Ensure compliance with specified standards
6. Format output according to the requested document type

Output Guidelines:
- Be comprehensive yet concise
- Use professional language appropriate for the audience
- Include actionable insights and recommendations
- Provide evidence-based content with proper citations when applicable
- Maintain consistency with the client's industry terminology

For technical documents (HLD, LLD):
- Follow IEEE and TOGAF standards
- Include system diagrams and architecture visualizations
- Provide detailed technical specifications
- Include security and performance considerations

For business documents (PowerPoint, Word):
- Focus on business value and ROI
- Use clear, executive-friendly language
- Include relevant charts and metrics
- Provide strategic recommendations

For data documents (Excel):
- Create structured data models
- Include formulas and calculations
- Provide data visualization recommendations
- Include sample data when appropriate`;
  }

  async generateDocumentWithAgent(type, requirements, context, template = null) {
    if (!this.assistantId) {
      throw new Error('Assistant not initialized');
    }

    try {
      // Create a thread
      const thread = await this.openai.beta.threads.create();

      // Prepare the message
      const userMessage = this.buildAgentPrompt(type, requirements, context, template);

      // Add message to thread
      await this.openai.beta.threads.messages.create(thread.id, {
        role: 'user',
        content: userMessage
      });

      // Run the assistant
      const run = await this.openai.beta.threads.runs.create(thread.id, {
        assistant_id: this.assistantId
      });

      // Wait for completion
      const result = await this.waitForCompletion(thread.id, run.id);

      // Get messages
      const messages = await this.openai.beta.threads.messages.list(thread.id);
      
      // Extract the assistant's response
      const assistantMessage = messages.data.find(m => m.role === 'assistant');
      
      if (!assistantMessage) {
        throw new Error('No response from assistant');
      }

      // Parse and structure the response
      return this.parseAssistantResponse(assistantMessage, type);

    } catch (error) {
      console.error('Error generating document with agent:', error);
      throw error;
    }
  }

  buildAgentPrompt(type, requirements, context, template) {
    let prompt = `Generate a professional ${type} document with the following details:

Client: ${context.client}
Project: ${context.projectName}
Author: ${context.author || 'HABA Consulting'}

Requirements:
${JSON.stringify(requirements, null, 2)}
`;

    if (template) {
      prompt += `

Use this template structure:
${typeof template === 'string' ? template : JSON.stringify(template, null, 2)}

Follow the template structure exactly, filling in each section with relevant, high-quality content.`;
    }

    prompt += `

Additional Instructions:
1. Generate comprehensive content for each section
2. Include relevant examples and best practices
3. Add recommendations specific to the client's industry
4. Ensure the document is ready for professional presentation
5. If applicable, suggest diagrams or visualizations that would enhance the document

Format the output as a structured JSON object with sections, content, and metadata.`;

    return prompt;
  }

  async waitForCompletion(threadId, runId, maxAttempts = 60) {
    let attempts = 0;
    
    while (attempts < maxAttempts) {
      const run = await this.openai.beta.threads.runs.retrieve(threadId, runId);
      
      if (run.status === 'completed') {
        return run;
      } else if (run.status === 'failed' || run.status === 'cancelled' || run.status === 'expired') {
        throw new Error(`Run ${run.status}: ${run.last_error?.message || 'Unknown error'}`);
      }
      
      // Wait before checking again
      await new Promise(resolve => setTimeout(resolve, 1000));
      attempts++;
    }
    
    throw new Error('Timeout waiting for assistant response');
  }

  parseAssistantResponse(message, type) {
    try {
      // Extract text content
      const textContent = message.content
        .filter(c => c.type === 'text')
        .map(c => c.text.value)
        .join('\n');

      // Try to parse as JSON
      try {
        const jsonMatch = textContent.match(/```json\n?([\s\S]*?)\n?```/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[1]);
        }
        
        // Try direct JSON parse
        return JSON.parse(textContent);
      } catch {
        // If not JSON, structure it appropriately
        return this.structureTextContent(textContent, type);
      }
    } catch (error) {
      console.error('Error parsing assistant response:', error);
      return {
        type,
        content: message.content,
        error: 'Failed to parse response'
      };
    }
  }

  structureTextContent(text, type) {
    const lines = text.split('\n').filter(line => line.trim());
    const sections = [];
    let currentSection = null;

    for (const line of lines) {
      // Check if it's a heading (starts with #, numbers, or uppercase)
      if (line.match(/^#+\s/) || line.match(/^\d+\./) || line.match(/^[A-Z][A-Z\s]+$/)) {
        if (currentSection) {
          sections.push(currentSection);
        }
        currentSection = {
          title: line.replace(/^#+\s/, '').replace(/^\d+\.\s*/, '').trim(),
          content: []
        };
      } else if (currentSection) {
        currentSection.content.push(line.trim());
      }
    }

    if (currentSection) {
      sections.push(currentSection);
    }

    return {
      type,
      sections,
      metadata: {
        generated: new Date().toISOString(),
        model: 'gpt-4-turbo-preview'
      }
    };
  }

  async generateWithFunctionCalling(type, requirements, context, template = null) {
    // Alternative approach using function calling for more structured output
    try {
      const messages = [
        {
          role: 'system',
          content: this.getSystemPrompt()
        },
        {
          role: 'user',
          content: this.buildAgentPrompt(type, requirements, context, template)
        }
      ];

      const functions = [
        {
          name: 'create_document_section',
          description: 'Create a section of the document',
          parameters: {
            type: 'object',
            properties: {
              section_title: {
                type: 'string',
                description: 'Title of the section'
              },
              content: {
                type: 'array',
                items: {
                  type: 'string'
                },
                description: 'Content paragraphs for the section'
              },
              subsections: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    title: { type: 'string' },
                    content: { type: 'array', items: { type: 'string' } }
                  }
                },
                description: 'Optional subsections'
              },
              diagrams: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    type: { type: 'string' },
                    description: { type: 'string' },
                    data: { type: 'object' }
                  }
                },
                description: 'Diagrams or visualizations for this section'
              }
            },
            required: ['section_title', 'content']
          }
        },
        {
          name: 'add_code_example',
          description: 'Add a code example to the document',
          parameters: {
            type: 'object',
            properties: {
              language: {
                type: 'string',
                description: 'Programming language'
              },
              code: {
                type: 'string',
                description: 'The code example'
              },
              description: {
                type: 'string',
                description: 'Description of what the code does'
              }
            },
            required: ['language', 'code']
          }
        },
        {
          name: 'create_data_table',
          description: 'Create a data table for the document',
          parameters: {
            type: 'object',
            properties: {
              title: {
                type: 'string',
                description: 'Table title'
              },
              headers: {
                type: 'array',
                items: { type: 'string' },
                description: 'Column headers'
              },
              rows: {
                type: 'array',
                items: {
                  type: 'array',
                  items: { type: 'string' }
                },
                description: 'Table rows'
              }
            },
            required: ['headers', 'rows']
          }
        }
      ];

      const response = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: messages,
        functions: functions,
        function_call: 'auto',
        temperature: 0.7,
        max_tokens: 4000
      });

      return this.processFunctionCallResponse(response, type);

    } catch (error) {
      console.error('Error with function calling:', error);
      throw error;
    }
  }

  processFunctionCallResponse(response, type) {
    const sections = [];
    const metadata = {
      type,
      generated: new Date().toISOString(),
      model: 'gpt-4-turbo-preview'
    };

    // Process the response
    if (response.choices[0].message.function_call) {
      const functionCall = response.choices[0].message.function_call;
      const args = JSON.parse(functionCall.arguments);
      
      if (functionCall.name === 'create_document_section') {
        sections.push(args);
      }
    }

    // Also include regular content
    if (response.choices[0].message.content) {
      const content = response.choices[0].message.content;
      sections.push({
        section_title: 'Generated Content',
        content: [content]
      });
    }

    return {
      type,
      sections,
      metadata
    };
  }

  async uploadTemplate(templateFile) {
    try {
      // Upload file to OpenAI for retrieval
      const file = await this.openai.files.create({
        file: templateFile,
        purpose: 'assistants'
      });

      // Attach to assistant
      if (this.assistantId) {
        await this.openai.beta.assistants.files.create(this.assistantId, {
          file_id: file.id
        });
      }

      return {
        fileId: file.id,
        filename: file.filename,
        status: 'uploaded'
      };
    } catch (error) {
      console.error('Error uploading template:', error);
      throw error;
    }
  }

  async generateImage(prompt, size = '1024x1024') {
    try {
      const response = await this.openai.images.generate({
        model: 'dall-e-3',
        prompt: prompt,
        n: 1,
        size: size,
        quality: 'standard',
        style: 'natural'
      });

      return response.data[0].url;
    } catch (error) {
      console.error('Error generating image:', error);
      throw error;
    }
  }
}

module.exports = OpenAIAgentService;