# HABA.io - AI-Powered Document Generation Platform

HABA.io is a professional document generation platform that uses AI (OpenAI GPT-4 and Claude) to create high-quality technical and business documents for consultancy firms.

## Features

### Document Generation
- **HLD (High-Level Design)** - System architecture documents following IEEE/TOGAF standards
- **LLD (Low-Level Design)** - Detailed technical specifications
- **PowerPoint** - Professional presentations
- **Word Documents** - Formal business documents
- **Excel Spreadsheets** - Data analysis and calculations

### AI Integration
- **OpenAI GPT-4** - Primary AI service for document generation
- **Claude (Anthropic)** - Alternative AI service for Google Docs
- **OpenAI Assistants API** - Advanced agent capabilities with code interpreter

### Document Management
- Version control and history tracking
- Multi-format export (JSON, PDF, DOCX, PPTX, XLSX)
- Template upload and customization
- Document comparison and rollback

### AI Chat Assistant
- Real-time AI chat interface
- Conversation history support
- Multiple model selection (GPT-4, Claude)
- Quick prompts for common tasks

## Tech Stack

| Component | Technology |
|-----------|------------|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS, Framer Motion |
| Backend | Node.js 20, Express 4.18 |
| Authentication | Passport.js (Local Strategy + Google OAuth) |
| AI Services | OpenAI API, Anthropic Claude API |
| Document Generation | Officegen (PPTX/DOCX/XLSX), PDF-lib, html-pdf-node |
| Deployment | Railway.app with Nixpacks |

## Project Structure

```
haba/
├── src/                          # React frontend
│   ├── pages/                    # Page components
│   │   ├── AdvancedDocumentGenerator.tsx  # V3 document generator
│   │   ├── SimpleDocumentGenerator.tsx    # V2 document generator
│   │   ├── AIAssistants.tsx      # AI chat interface
│   │   ├── Dashboard.tsx         # Main dashboard
│   │   ├── Clients.tsx           # Client management
│   │   ├── Projects.tsx          # Project management
│   │   └── Settings.tsx          # Application settings
│   ├── layouts/                  # Layout components
│   │   └── DashboardLayout.tsx   # Authenticated layout
│   ├── contexts/                 # React contexts
│   │   └── AuthContext.tsx       # Authentication state
│   └── styles/                   # Global styles
├── server/                       # Backend services
│   ├── services/
│   │   ├── claudeService.js      # Claude API integration
│   │   ├── openaiService.js      # OpenAI API integration
│   │   ├── openaiAgentService.js # OpenAI Assistants API
│   │   ├── documentService.js    # Document management
│   │   └── documentConverterService.js # Format conversion
│   ├── controllers/
│   │   ├── simpleDocumentController.js    # V2 API endpoints
│   │   ├── enhancedDocumentController.js  # V3 API endpoints
│   │   └── documentController.js          # V1 API endpoints
│   └── templates/                # Document templates
│       ├── hld-template.json
│       └── lld-template.json
├── server.js                     # Express server entry point
├── vite.config.ts               # Vite configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── package.json                 # Dependencies and scripts
├── nixpacks.toml                # Railway deployment config
└── CLAUDE.md                    # Development guidelines
```

## Getting Started

### Prerequisites
- Node.js 20 or higher
- npm 9 or higher
- OpenAI API key (required for document generation)
- Claude API key (optional, for Claude-based generation)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd haba
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`:
```env
# Server Configuration
PORT=3000
NODE_ENV=development
SESSION_SECRET=your-secure-session-secret

# AI Services (Required for document generation)
OPENAI_API_KEY=sk-your-openai-api-key
OPENAI_MODEL=gpt-4-turbo-preview

# Claude API (Optional)
CLAUDE_API_KEY=your-claude-api-key
CLAUDE_MODEL=claude-3-5-sonnet-20241022

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

5. Start the development servers:
```bash
# Terminal 1: Start backend server
npm run server

# Terminal 2: Start frontend dev server
npm run dev
```

6. Access the application:
- Frontend: http://localhost:3001
- Backend API: http://localhost:3000

### Default Login Credentials
- **Username:** stephen
- **Password:** haba2024

## API Documentation

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Login with username/password |
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/logout` | Logout current user |
| GET | `/api/auth/check` | Check authentication status |
| GET | `/api/user` | Get current user info |

### Document Generation API (V3 - Recommended)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v3/documents` | List all documents |
| POST | `/api/v3/documents/generate` | Generate new document |
| GET | `/api/v3/documents/:id/download` | Download document |
| POST | `/api/v3/documents/:id/convert` | Convert document format |
| GET | `/api/v3/templates` | Get available templates |
| POST | `/api/v3/images/generate` | Generate image with DALL-E |

#### Generate Document Request
```json
POST /api/v3/documents/generate
Content-Type: multipart/form-data

{
  "documentType": "HLD",           // HLD, LLD, POWERPOINT, WORD, EXCEL
  "client": "ClientName",
  "projectName": "ProjectName",
  "requirements": {
    "businessObjective": "...",
    "technicalRequirements": "...",
    "scope": "...",
    "deliverables": "..."
  },
  "outputFormat": "json",          // json, pdf, docx, pptx, xlsx
  "useAgent": true,                // Use OpenAI Assistant
  "template": <file>               // Optional template file
}
```

### Document Generation API (V2 - Simple)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v2/documents` | List all documents |
| POST | `/api/v2/documents/generate` | Generate new document |
| GET | `/api/v2/documents/:id` | Get document by ID |
| GET | `/api/v2/documents/:id/download` | Download document |
| GET | `/api/v2/templates` | Get available templates |

### AI Chat Endpoint

```json
POST /api/ai/chat
{
  "message": "Your question here",
  "model": "gpt-4",
  "conversationHistory": []
}
```

## Deployment

### Railway Deployment

The application is configured for Railway deployment with Nixpacks:

1. Connect your repository to Railway
2. Set environment variables in Railway dashboard:
   - `OPENAI_API_KEY`
   - `SESSION_SECRET`
   - `NODE_ENV=production`
3. Railway will automatically detect and build with Nixpacks

### Manual Build

```bash
# Build frontend
npm run build

# Start production server
npm start
```

## Document Types

### High-Level Design (HLD)
Generates comprehensive system architecture documents including:
- Executive Summary
- Business Objectives
- System Architecture Overview
- Component Architecture
- Technology Stack
- Security Architecture
- Deployment Strategy
- Risks & Mitigations

### Low-Level Design (LLD)
Creates detailed technical specifications including:
- Technical Overview
- Component Details
- API Specifications
- Database Design
- Core Algorithms
- Error Handling
- Performance Optimization
- Testing Strategy

### PowerPoint Presentations
Professional presentations with:
- Title slides
- Executive summary
- Problem/Solution slides
- Implementation timeline
- Next steps

### Word Documents
Formal documents with:
- Cover page
- Table of contents
- Structured sections
- Professional formatting

### Excel Spreadsheets
Data documents with:
- Summary dashboard
- Data input sheets
- Calculations
- Charts and visualizations

## Configuration

### Vite Development Server
The frontend runs on port 3001 and proxies API requests to the backend on port 3000:

```typescript
// vite.config.ts
server: {
  port: 3001,
  proxy: {
    '/api': 'http://localhost:3000',
    '/auth': 'http://localhost:3000'
  }
}
```

### Tailwind CSS Theme
Custom theme with professional colors:
- Primary: Sky blue (#0ea5e9)
- Accent: Purple/Magenta gradient
- Background: Dark (#0A0A0B)

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite development server |
| `npm run server` | Start Express backend server |
| `npm run build` | Build frontend for production |
| `npm start` | Start production server |
| `npm run preview` | Preview production build |

## Contributing

1. Create a feature branch
2. Make your changes
3. Run `npm run build` to verify build succeeds
4. Submit a pull request

## License

Proprietary - HABA Consulting

## Support

For issues or questions, contact the development team.
