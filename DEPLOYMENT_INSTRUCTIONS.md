# Deployment Instructions for haba.io on Railway

## Prerequisites
- Railway account
- Google OAuth credentials configured
- Environment variables ready

## Environment Variables Required
```
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
SESSION_SECRET=your_secure_session_secret
PORT=3000
NODE_ENV=production
```

## Deployment Steps

### 1. Local Testing
```bash
# Install dependencies
npm install

# Build the frontend
npm run build

# Test locally
npm start
# Visit http://localhost:3000
```

### 2. Railway Deployment

#### Option A: Deploy from GitHub
1. Push your code to GitHub
2. Connect Railway to your GitHub repository
3. Add environment variables in Railway dashboard
4. Railway will automatically build and deploy

#### Option B: Deploy using Railway CLI
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Initialize project
railway init

# Add environment variables
railway variables set GOOGLE_CLIENT_ID=your_id
railway variables set GOOGLE_CLIENT_SECRET=your_secret
railway variables set SESSION_SECRET=your_session_secret

# Deploy
railway up
```

### 3. Post-Deployment Configuration

#### Update Google OAuth Redirect URI
Add your Railway URL to Google Console:
- `https://your-app.railway.app/auth/google/callback`

#### Custom Domain (Optional)
1. Add custom domain in Railway settings
2. Update DNS records:
   - Type: CNAME
   - Name: @ or www
   - Value: your-app.railway.app

## Build Configuration for Railway

Create or update `railway.json`:
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm run build && npm start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

## nixpacks.toml Configuration
The existing nixpacks.toml should work:
```toml
[phases.setup]
nixPkgs = ["nodejs-18_x"]

[phases.install]
cmds = ["npm install"]

[phases.build]
cmds = ["npm run build"]

[start]
cmd = "npm start"
```

## Monitoring & Maintenance

### Check Application Health
- Visit `/api/auth/check` to verify API is working
- Monitor Railway dashboard for logs and metrics

### Update Deployment
```bash
# Make changes locally
# Test thoroughly
npm run build
npm start

# Push to repository (GitHub deployment)
git add .
git commit -m "Update application"
git push

# Or use Railway CLI
railway up
```

## Troubleshooting

### Common Issues

1. **Google OAuth Error**
   - Verify redirect URI matches exactly
   - Check client ID and secret are correct
   - Ensure OAuth consent screen is configured

2. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are in package.json
   - Review build logs in Railway dashboard

3. **Session Issues**
   - Ensure SESSION_SECRET is set
   - Check cookie settings for production

4. **Static Files Not Serving**
   - Verify `dist` folder exists after build
   - Check express.static middleware configuration

## Security Checklist
- ✅ Environment variables secured in Railway
- ✅ Session secret is strong and unique
- ✅ HTTPS enabled (Railway provides by default)
- ✅ Google OAuth properly configured
- ✅ No sensitive data in repository

## Performance Optimization
- Enable Railway's auto-scaling
- Configure caching headers for static assets
- Monitor response times in Railway metrics
- Consider CDN for static assets

## Backup Strategy
- Regular database backups (when implemented)
- Export environment variables
- Maintain git repository as code backup
- Document all configurations

---

**Last Updated**: January 2024
**Support**: For issues, check Railway documentation or contact support