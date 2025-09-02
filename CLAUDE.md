# CLAUDE.md - Project Development Guidelines

## Important Commands to Run
When making changes to this project, always run these commands before committing:
```bash
npm run build
npm run test (if tests exist)
```

## Project Overview
HABA.io is a document generation platform that creates professional documents using AI:
- **PowerPoint, Word, Excel**: Use OpenAI GPT-4 API
- **Google Docs**: Use Claude Sonnet 3.5 API
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
- ✅ Basic authentication system
- ✅ Express server setup
- ✅ React frontend
- 🚧 Document generation pipeline (IN PROGRESS)
- 🚧 Template system (IN PROGRESS)
- ⏳ AI service integration
- ⏳ Microsoft Office document support
- ⏳ Full Google Docs integration

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
| HLD | Claude | Google Docs | 🚧 In Progress |
| LLD | Claude | Google Docs | 🚧 In Progress |
| PowerPoint | OpenAI | .pptx | ⏳ Planned |
| Word | OpenAI | .docx | ⏳ Planned |
| Excel | OpenAI | .xlsx | ⏳ Planned |

## Next Steps
1. Complete API service integration
2. Implement template system
3. Add document format converters
4. Test full pipeline end-to-end
5. Deploy to Railway with proper configs