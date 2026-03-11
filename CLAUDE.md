# CLAUDE.md - Project Development Guidelines

## Important Commands to Run
When making changes to this project, always run these commands before committing:
```bash
npm run build
npm run test (if tests exist)
```

## Project Overview
HABA.io is a document generation platform that creates professional documents using AI:
- **PowerPoint, Word, Excel**: Use OpenAI GPT-5.4 API
- **Google Docs**: Use Claude Sonnet 4.6 API
- **Deployment**: Railway.app

## Document Generation Pipeline Architecture

### Phase 1: API Services Setup
- Claude API for Google Docs generation
- OpenAI API for Microsoft Office documents
- Service classes in `/server/services/`

### Phase 2: Template System
- Templates stored in `/server/templates/`
- Support for HLD, LLD, PowerPoint, Word, Excel templates
- Dynamic template selection based on document type

### Phase 3: Document Generation Flow
1. User selects document type and template
2. System routes to appropriate AI service
3. AI generates content based on template
4. Document created in appropriate format
5. Version control and storage handled

### Phase 4: Frontend Integration
- Enhanced document generator UI
- Template selector
- Document type selector
- Preview and export options

## API Keys Configuration

### Local Development (.env file)
```
CLAUDE_API_KEY=your-claude-key
OPENAI_API_KEY=your-openai-key
```

### Railway Production
Set environment variables in Railway dashboard:
- CLAUDE_API_KEY
- OPENAI_API_KEY
- Other production configs

## Current Implementation Status
- ✅ Basic authentication system (username/password + Google OAuth)
- ✅ Express server setup with 3 API versions (v1, v2, v3)
- ✅ React frontend with all pages complete
- ✅ Document generation pipeline (OpenAI + Claude)
- ✅ Template system (HLD, LLD, PowerPoint, Word, Excel)
- ✅ AI service integration (OpenAI GPT-5.4, Claude Opus 4.6, Gemini Pro 3.1, OpenAI Assistants)
- ✅ Microsoft Office document support (PPTX, DOCX, XLSX via Officegen)
- ✅ PDF export support (via html-pdf-node)
- ✅ AI Chat Assistant with real API integration
- ✅ Document versioning and management

## Testing the Pipeline
1. Start local server: `npm run server`
2. Start frontend: `npm run dev`
3. Login with: username=stephen, password=haba2024
4. Navigate to Document Generator
5. Select template and generate document

## Common Issues & Solutions
- **API Key Issues**: Ensure keys are properly set in .env
- **CORS Issues**: Check server.js CORS configuration
- **Build Issues**: Run `npm install` and `npm run build`

## Railway Deployment Checklist
- [ ] Set all environment variables in Railway
- [ ] Ensure build command is correct
- [ ] Test API endpoints after deployment
- [ ] Verify document generation works in production

## Document Types Support Matrix
| Document Type | AI Service | Format | Status |
|--------------|------------|---------|---------|
| HLD | OpenAI/Claude | JSON/PDF/DOCX | ✅ Complete |
| LLD | OpenAI/Claude | JSON/PDF/DOCX | ✅ Complete |
| PowerPoint | OpenAI | .pptx | ✅ Complete |
| Word | OpenAI | .docx | ✅ Complete |
| Excel | OpenAI | .xlsx | ✅ Complete |

## API Endpoints

### V3 API (Recommended - Advanced)
- `GET /api/v3/documents` - List documents
- `POST /api/v3/documents/generate` - Generate with file upload support
- `GET /api/v3/documents/:id/download` - Download in any format
- `POST /api/v3/images/generate` - DALL-E image generation

### V2 API (Simple MVP)
- `GET /api/v2/documents` - List documents
- `POST /api/v2/documents/generate` - Basic generation
- `GET /api/v2/templates` - Get templates

### AI Chat
- `POST /api/ai/chat` - Chat with AI assistant

## Architecture Notes
- All document types now use OpenAI GPT-5.4 by default for consistent performance
- Claude Sonnet 4.6 can be enabled for HLD/LLD by setting `USE_CLAUDE_FOR_DOCS=true`
- OpenAI Assistants API provides advanced agent capabilities with code interpreter
- Document converter service handles PDF, DOCX, PPTX, XLSX output formats