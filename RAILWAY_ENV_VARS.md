# Railway Environment Variables

## Required Environment Variables for Railway.app

Add these environment variables in your Railway project settings:

### Core Configuration
```
PORT=3000
NODE_ENV=production
SESSION_SECRET=your-secure-session-secret-here
```

### API Keys (REQUIRED FOR MVP)
```
CLAUDE_API_KEY=your-claude-api-key-here

OPENAI_API_KEY=your-openai-api-key-here
```

### Model Configuration
```
CLAUDE_MODEL=claude-3-5-sonnet-20241022
OPENAI_MODEL=gpt-4-turbo-preview
```

### Feature Flags
```
ENABLE_VERSIONING=true
ENABLE_GOOGLE_DOCS=false
ENABLE_CLAUDE_AI=true
ENABLE_OPENAI=true
MAX_DOCUMENT_VERSIONS=50
```

### Rate Limiting
```
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Document Generation
```
MAX_DOCUMENT_SIZE_MB=10
MAX_TOKENS_PER_REQUEST=4000
```

## How to Add in Railway

1. Go to your Railway project dashboard
2. Click on your service
3. Go to "Variables" tab
4. Click "RAW Editor"
5. Copy and paste the variables above
6. Click "Update Variables"
7. Railway will automatically redeploy

## Verify Deployment

After deployment, test the API endpoints:

1. Visit: `https://your-app.railway.app`
2. Login with: username=stephen, password=haba2024
3. Navigate to Documents section
4. Click "Test API Connections" to verify both APIs work

## Troubleshooting

If document generation fails:
1. Check Railway logs for API errors
2. Verify API keys are correctly set
3. Ensure you have sufficient API credits
4. Check rate limits on both Claude and OpenAI

## Security Notes

- These API keys should be kept secure
- Consider rotating keys periodically
- Set up proper CORS and rate limiting for production
- Use environment-specific keys (dev vs prod)