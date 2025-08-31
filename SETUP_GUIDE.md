# Professional Document Generation Pipeline - Setup Guide

## Overview
This guide will help you set up the complete document generation pipeline that creates professional HLD & LLD architecture documents using Claude API and stores them in Google Docs.

## Prerequisites

### 1. Claude API Access
- Sign up for Claude API access at https://console.anthropic.com
- Generate an API key from your dashboard
- Keep your API key secure

### 2. Google Cloud Setup
- Create a Google Cloud Project
- Enable Google Docs API and Google Drive API
- Create a Service Account for authentication

## Step-by-Step Setup

### Step 1: Clone and Install Dependencies

```bash
# Clone the repository
git clone [your-repo-url]
cd haba

# Install dependencies
npm install
```

### Step 2: Configure Claude API

1. Copy the environment template:
```bash
cp .env.example .env
```

2. Add your Claude API key:
```env
CLAUDE_API_KEY=sk-ant-xxxxxxxxxxxxx
```

### Step 3: Setup Google Cloud Service Account

1. Go to [Google Cloud Console](https://console.cloud.google.com)

2. Create a new project or select existing one

3. Enable APIs:
   - Go to "APIs & Services" > "Library"
   - Search and enable "Google Docs API"
   - Search and enable "Google Drive API"

4. Create Service Account:
   - Go to "IAM & Admin" > "Service Accounts"
   - Click "Create Service Account"
   - Name: "HABA Document Generator"
   - Role: "Editor"
   - Create and download JSON key

5. Save the JSON key:
```bash
mkdir credentials
mv ~/Downloads/[your-service-account-key].json ./credentials/google-service-account.json
```

6. Update .env:
```env
GOOGLE_SERVICE_ACCOUNT_KEY_PATH=./credentials/google-service-account.json
```

### Step 4: Configure Google Drive Sharing

1. Share your Google Drive folder with the service account email:
   - Find the service account email in the JSON key file (client_email field)
   - Create a folder in Google Drive called "HABA Documents"
   - Right-click > Share > Add the service account email with Editor permissions

2. Get the folder ID:
   - Open the folder in Google Drive
   - Copy the ID from the URL: `https://drive.google.com/drive/folders/[FOLDER_ID]`
   - Add to .env:
   ```env
   GOOGLE_DRIVE_FOLDER_ID=your-folder-id-here
   ```

### Step 5: Initialize the System

1. Start the server:
```bash
npm run server
```

2. Start the frontend (in another terminal):
```bash
npm run dev
```

3. Login with credentials:
   - Username: stephen
   - Password: haba2024

4. Setup folder structure:
   - Navigate to Document Generator
   - Click "Setup Google Drive" button
   - This creates the organized folder structure

### Step 6: Generate Your First Document

1. Navigate to Document Generator page
2. Select document type (HLD or LLD)
3. Choose client (Marlink or AllianzGI)
4. Fill in project requirements:
   - Project Name
   - Business Objectives
   - Technical Requirements
   - Scope & Deliverables
   - Timeline
   - Budget

5. Click "Generate Document"
6. The system will:
   - Send requirements to Claude API
   - Generate professional document content
   - Create Google Doc with formatting
   - Save to appropriate folder
   - Track version history

## Pipeline Features

### Document Generation
- **HLD Documents**: System architecture, component design, technology stack
- **LLD Documents**: Detailed specifications, API docs, database schemas

### Version Control
- Semantic versioning (Major.Minor.Patch)
- Version history tracking
- Rollback capability
- Approval workflow

### Google Drive Integration
- Organized folder structure by client and document type
- Automatic file organization
- Share documents with team members
- Export to multiple formats (PDF, DOCX, HTML)

### Document Standards
- IEEE 42010 compliance for architecture descriptions
- TOGAF documentation standards
- OpenAPI 3.0 for API specifications
- Professional formatting and structure

## Advanced Configuration

### Database Setup (Optional)
For production use with persistent storage:

1. Install PostgreSQL:
```bash
# Ubuntu/Debian
sudo apt-get install postgresql

# macOS
brew install postgresql
```

2. Create database:
```sql
CREATE DATABASE haba_docs;
```

3. Update .env:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/haba_docs
```

### Redis Cache (Optional)
For improved performance:

1. Install Redis:
```bash
# Ubuntu/Debian
sudo apt-get install redis-server

# macOS
brew install redis
```

2. Update .env:
```env
REDIS_URL=redis://localhost:6379
```

## API Endpoints

### Document Management
- `POST /api/documents/generate` - Generate new document
- `GET /api/documents/:id` - Get document details
- `PUT /api/documents/:id` - Update document
- `GET /api/documents` - List all documents
- `GET /api/documents/:id/export?format=pdf` - Export document

### Version Control
- `GET /api/documents/:id/versions` - Get version history
- `POST /api/documents/:id/versions/:version/approve` - Approve version
- `POST /api/documents/:id/rollback` - Rollback to previous version
- `GET /api/documents/:id/compare?version1=1.0.0&version2=2.0.0` - Compare versions

### Templates
- `GET /api/templates` - List available templates
- `GET /api/templates/:type` - Get specific template

## Troubleshooting

### Common Issues

1. **Claude API Error**
   - Verify API key is correct
   - Check API rate limits
   - Ensure sufficient credits

2. **Google Docs Access Denied**
   - Verify service account has Editor permissions
   - Check folder is shared with service account email
   - Ensure APIs are enabled in Google Cloud Console

3. **Document Generation Fails**
   - Check all required fields are filled
   - Verify internet connection
   - Check server logs for detailed errors

### Debug Mode
Enable debug logging:
```env
LOG_LEVEL=debug
NODE_ENV=development
```

## Security Best Practices

1. **API Keys**
   - Never commit API keys to version control
   - Use environment variables
   - Rotate keys regularly

2. **Google Service Account**
   - Limit permissions to minimum required
   - Use separate accounts for dev/prod
   - Monitor usage in Google Cloud Console

3. **Document Access**
   - Implement proper authentication
   - Use role-based access control
   - Audit document access logs

## Production Deployment

### Using Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Environment Variables
Ensure all production environment variables are set:
- Use secrets management service
- Enable HTTPS
- Configure proper CORS settings
- Set up monitoring and alerts

## Support & Maintenance

### Regular Tasks
- Review and update document templates monthly
- Archive old documents quarterly
- Update Claude API model when new versions available
- Monitor API usage and costs

### Backup Strategy
- Regular Google Drive backups
- Database backups (if using)
- Version history exports

## Next Steps

1. **Customize Templates**: Modify templates in `/server/templates/` for your specific needs
2. **Add More Clients**: Extend the client list in the UI
3. **Integrate with Project Management**: Connect to Jira, Asana, etc.
4. **Add More Export Formats**: PowerPoint, Confluence, etc.
5. **Implement Collaborative Editing**: Real-time collaboration features

## Contact & Support

For issues or questions:
- Create an issue in the repository
- Contact the development team
- Review documentation at `/DOCUMENT_PIPELINE_ARCHITECTURE.md`

---

**Version**: 1.0.0  
**Last Updated**: January 2024  
**Maintained By**: HABA Development Team