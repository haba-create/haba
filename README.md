# haba.io Website

This is a minimal Express application with Google authentication. It is configured for deployment on Railway using Nixpacks.

## Setup

1. Copy `.env.example` to `.env` and fill in your Google OAuth credentials and a session secret.

```
cp .env.example .env
```

2. Install dependencies:

```
npm install
```

3. Run the application:

```
npm start
```

The site provides a Google login. Authenticated users can access `/private` for their workspace.
