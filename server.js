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
});