const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bcrypt = require('bcryptjs');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.static('dist'));

// Simple in-memory user store (in production, use a database)
const users = [
  {
    id: 1,
    username: 'stephen',
    password: bcrypt.hashSync('haba2024', 10),
    displayName: 'Stephen',
    email: 'stephen@haba.io'
  }
];

// Configure passport local strategy
passport.use(new LocalStrategy(
  async function(username, password, done) {
    try {
      const user = users.find(u => u.username === username);
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

// Configure Google OAuth strategy (if credentials are provided)
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL || '/api/auth/google/callback'
  }, (accessToken, refreshToken, profile, done) => {
    // Find or create user
    let user = users.find(u => u.googleId === profile.id || u.email === (profile.emails && profile.emails[0] && profile.emails[0].value));
    if (!user) {
      user = {
        id: users.length + 1,
        googleId: profile.id,
        username: profile.emails?.[0]?.value || profile.id,
        displayName: profile.displayName,
        email: profile.emails?.[0]?.value || '',
        photo: profile.photos?.[0]?.value || ''
      };
      users.push(user);
    } else {
      // Update photo if not set
      if (!user.photo && profile.photos?.[0]?.value) {
        user.photo = profile.photos[0].value;
      }
      if (profile.displayName) {
        user.displayName = profile.displayName;
      }
    }
    return done(null, user);
  }));
}

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  const user = users.find(u => u.id === id);
  done(null, user);
});

app.use(session({
  secret: process.env.SESSION_SECRET || 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

function ensureAuth(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.status(401).json({ error: 'Unauthorized' });
}

// API Routes
app.get('/api/auth/check', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      authenticated: true,
      user: {
        displayName: req.user.displayName,
        email: req.user.email,
        photo: req.user.photo || null
      }
    });
  } else {
    res.json({ authenticated: false });
  }
});

app.get('/api/user', ensureAuth, (req, res) => {
  res.json({
    displayName: req.user.displayName,
    email: req.user.email,
    photo: req.user.photo
  });
});

// Import Document Controllers
const SimpleDocumentController = require('./server/controllers/simpleDocumentController');
const simpleDocController = new SimpleDocumentController();

// Enhanced controller with Agent capabilities
const EnhancedDocumentController = require('./server/controllers/enhancedDocumentController');
const enhancedDocController = new EnhancedDocumentController();

// Keep old controller for backwards compatibility
const DocumentController = require('./server/controllers/documentController');
const documentController = new DocumentController();

// NEW ENHANCED Document API endpoints (v3 - with Agent capabilities)
app.get('/api/v3/documents', ensureAuth, (req, res) => enhancedDocController.listDocuments(req, res));
app.post('/api/v3/documents/generate', 
  ensureAuth, 
  (req, res, next) => enhancedDocController.handleTemplateUpload(req, res, next),
  (req, res) => enhancedDocController.generateAdvancedDocument(req, res)
);
app.get('/api/v3/documents/:documentId/download', ensureAuth, (req, res) => enhancedDocController.downloadConvertedDocument(req, res));
app.post('/api/v3/documents/:documentId/convert', ensureAuth, (req, res) => enhancedDocController.convertDocument(req, res));
app.get('/api/v3/templates', ensureAuth, (req, res) => enhancedDocController.getTemplates(req, res));
app.post('/api/v3/images/generate', ensureAuth, (req, res) => enhancedDocController.generateImage(req, res));

// SIMPLIFIED Document API endpoints (v2 - MVP)
app.get('/api/v2/documents', ensureAuth, (req, res) => simpleDocController.listDocuments(req, res));
app.post('/api/v2/documents/generate', ensureAuth, (req, res) => simpleDocController.generateDocument(req, res));
app.get('/api/v2/documents/:documentId', ensureAuth, (req, res) => simpleDocController.getDocument(req, res));
app.get('/api/v2/documents/:documentId/download', ensureAuth, (req, res) => simpleDocController.downloadDocument(req, res));
app.get('/api/v2/templates', ensureAuth, (req, res) => simpleDocController.getTemplates(req, res));
app.get('/api/v2/test', ensureAuth, (req, res) => simpleDocController.testGeneration(req, res));

// OLD Document API endpoints (keeping for backwards compatibility)
app.get('/api/documents', ensureAuth, (req, res) => documentController.listDocuments(req, res));
app.post('/api/documents/generate', ensureAuth, (req, res) => documentController.generateDocument(req, res));
app.get('/api/documents/:documentId', ensureAuth, (req, res) => documentController.getDocument(req, res));
app.put('/api/documents/:documentId', ensureAuth, (req, res) => documentController.updateDocument(req, res));
app.get('/api/documents/:documentId/compare', ensureAuth, (req, res) => documentController.compareVersions(req, res));
app.post('/api/documents/:documentId/versions/:version/approve', ensureAuth, (req, res) => documentController.approveVersion(req, res));
app.post('/api/documents/:documentId/rollback', ensureAuth, (req, res) => documentController.rollbackVersion(req, res));
app.get('/api/documents/:documentId/export', ensureAuth, (req, res) => documentController.exportDocument(req, res));
app.post('/api/documents/:documentId/share', ensureAuth, (req, res) => documentController.shareDocument(req, res));

// Template endpoints
app.get('/api/templates', ensureAuth, (req, res) => documentController.getTemplates(req, res));

// Setup endpoints
app.post('/api/setup/folders', ensureAuth, (req, res) => documentController.setupInitialFolders(req, res));

// AI Assistant endpoint with real API integration
app.post('/api/ai/chat', ensureAuth, async (req, res) => {
  const { message, model, conversationHistory } = req.body;

  try {
    // Check if OpenAI API is available
    if (process.env.OPENAI_API_KEY) {
      const axios = require('axios');

      // Build messages array with conversation history
      const messages = [
        {
          role: 'system',
          content: `You are an expert AI assistant for HABA Consulting, a professional data and AI consultancy firm.
You help with:
- Strategic business advice and planning
- Technical architecture and design recommendations
- Data analysis and insights
- Document generation guidance
- Code review and best practices
- Project management advice

Be professional, concise, and provide actionable insights. Format your responses with markdown for better readability.`
        }
      ];

      // Add conversation history if provided
      if (conversationHistory && Array.isArray(conversationHistory)) {
        for (const msg of conversationHistory.slice(-8)) {
          if (msg.role === 'user' || msg.role === 'assistant') {
            messages.push({
              role: msg.role,
              content: msg.content
            });
          }
        }
      }

      // Add current message
      messages.push({ role: 'user', content: message });

      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: model === 'gpt-4' ? 'gpt-5.4' : 'gpt-5.4',
          messages: messages,
          temperature: 0.7,
          max_tokens: 2000
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
          }
        }
      );

      res.json({
        response: response.data.choices[0].message.content,
        model: model,
        usage: response.data.usage
      });
    } else {
      // Fallback response when no API key is configured
      res.json({
        response: `**API Not Configured**\n\nI noticed that the OpenAI API key is not configured. To enable full AI capabilities, please set the \`OPENAI_API_KEY\` environment variable.\n\nIn the meantime, I received your message: "${message}"\n\nOnce configured, I'll be able to provide intelligent responses for:\n- Business strategy\n- Technical guidance\n- Data analysis\n- Document generation assistance`,
        model: model,
        note: 'API key not configured - showing placeholder response'
      });
    }
  } catch (error) {
    console.error('AI Chat error:', error.response?.data || error.message);
    res.status(500).json({
      error: 'Failed to process chat request',
      details: error.response?.data?.error?.message || error.message
    });
  }
});

// Google OAuth routes
app.get('/api/auth/google',
  (req, res, next) => {
    if (!process.env.GOOGLE_CLIENT_ID) {
      return res.status(501).json({ error: 'Google OAuth not configured' });
    }
    next();
  },
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/api/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login?error=google_auth_failed' }),
  (req, res) => {
    res.redirect('/dashboard');
  }
);

// Auth routes
app.post('/api/auth/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({ error: 'Authentication error' });
    }
    if (!user) {
      return res.status(401).json({ error: info.message || 'Invalid credentials' });
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Login failed' });
      }
      return res.json({
        success: true,
        user: {
          displayName: user.displayName,
          email: user.email,
          photo: user.photo || null
        }
      });
    });
  })(req, res, next);
});

app.post('/api/auth/register', async (req, res) => {
  const { username, password, email, displayName } = req.body;
  
  // Check if user exists
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ error: 'Username already exists' });
  }
  
  // Create new user
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: users.length + 1,
    username,
    password: hashedPassword,
    email,
    displayName: displayName || username
  };
  
  users.push(newUser);
  
  res.json({ success: true, message: 'User registered successfully' });
});

app.post('/api/auth/logout', (req, res) => {
  req.logout(() => {
    res.json({ success: true });
  });
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Login credentials: username=stephen, password=haba2024');
  
  // Check API keys on startup
  console.log('=== API Configuration Status ===');
  console.log('Claude API Key:', process.env.CLAUDE_API_KEY ? `Configured (${process.env.CLAUDE_API_KEY.length} chars)` : 'NOT CONFIGURED');
  console.log('OpenAI API Key:', process.env.OPENAI_API_KEY ? `Configured (${process.env.OPENAI_API_KEY.length} chars)` : 'NOT CONFIGURED');
  console.log('Claude Model:', process.env.CLAUDE_MODEL || 'claude-sonnet-4-6');
  console.log('OpenAI Model:', process.env.OPENAI_MODEL || 'gpt-5.4');
  console.log('================================');
  
  if (!process.env.CLAUDE_API_KEY && !process.env.OPENAI_API_KEY) {
    console.warn('⚠️  WARNING: No API keys configured. Document generation will not work.');
    console.warn('⚠️  Please set CLAUDE_API_KEY and/or OPENAI_API_KEY in your .env file or environment variables.');
  }
});