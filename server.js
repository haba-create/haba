const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const path = require('path');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.static('dist'));

// Only configure Google OAuth if credentials are provided
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback'
    },
    function(accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  ));
} else {
  console.warn('⚠️  Google OAuth not configured. Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET environment variables.');
}

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
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
  res.redirect('/');
}

// API Routes
app.get('/api/auth/check', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ 
      authenticated: true, 
      user: {
        displayName: req.user.displayName,
        email: req.user.emails?.[0]?.value || req.user.email
      }
    });
  } else {
    res.status(401).json({ authenticated: false });
  }
});

app.get('/api/user', ensureAuth, (req, res) => {
  res.json({
    displayName: req.user.displayName,
    email: req.user.emails?.[0]?.value || req.user.email,
    photo: req.user.photos?.[0]?.value
  });
});

// Document API endpoints
app.get('/api/documents', ensureAuth, (req, res) => {
  res.json([
    { id: 1, name: 'Marlink AI Integration Proposal', type: 'Proposal', date: '2024-01-15', status: 'sent' },
    { id: 2, name: 'AllianzGI Q4 Progress Report', type: 'Report', date: '2024-01-10', status: 'draft' },
  ]);
});

app.post('/api/documents/generate', ensureAuth, (req, res) => {
  const { template, client, data } = req.body;
  res.json({ 
    success: true, 
    documentId: Math.random().toString(36).substr(2, 9),
    message: 'Document generated successfully' 
  });
});

// AI Assistant endpoint (placeholder)
app.post('/api/ai/chat', ensureAuth, (req, res) => {
  const { message, model } = req.body;
  res.json({
    response: `This is a placeholder response for: "${message}" using ${model}`,
    model: model
  });
});

// Auth routes - only enable if OAuth is configured
app.get('/auth/google', (req, res, next) => {
  if (!process.env.GOOGLE_CLIENT_ID) {
    return res.status(503).json({ 
      error: 'Google OAuth not configured', 
      message: 'Please set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET environment variables' 
    });
  }
  passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
});

app.get('/auth/google/callback', (req, res, next) => {
  if (!process.env.GOOGLE_CLIENT_ID) {
    return res.redirect('/');
  }
  passport.authenticate('google', { failureRedirect: '/' })(req, res, next);
}, function(req, res) {
  res.redirect('/dashboard');
});

app.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
