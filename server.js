const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
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
        email: req.user.email
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

// AI Assistant endpoint (placeholder)
app.post('/api/ai/chat', ensureAuth, (req, res) => {
  const { message, model } = req.body;
  res.json({
    response: `This is a placeholder response for: "${message}" using ${model}`,
    model: model
  });
});

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
          email: user.email
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
  console.log('Claude Model:', process.env.CLAUDE_MODEL || 'claude-3-5-sonnet-20241022');
  console.log('OpenAI Model:', process.env.OPENAI_MODEL || 'gpt-4-turbo-preview');
  console.log('================================');
  
  if (!process.env.CLAUDE_API_KEY && !process.env.OPENAI_API_KEY) {
    console.warn('⚠️  WARNING: No API keys configured. Document generation will not work.');
    console.warn('⚠️  Please set CLAUDE_API_KEY and/or OPENAI_API_KEY in your .env file or environment variables.');
  }
});