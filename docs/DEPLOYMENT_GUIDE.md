# Alumni Connect - Deployment Guide

## Deployment Checklist

### Before Deployment

- [ ] All environment variables are configured
- [ ] Database schema is created in Supabase
- [ ] API endpoints are tested
- [ ] Frontend links are correct
- [ ] JWT secret is secure (min 32 characters)
- [ ] CORS is configured for your domain

## Backend Deployment Options

### Option 1: Heroku

1. Install Heroku CLI
2. Login to Heroku:
   ```bash
   heroku login
   ```
3. Create a new app:
   ```bash
   heroku create alumni-connect-api
   ```
4. Set environment variables:
   ```bash
   heroku config:set SUPABASE_URL=your_url
   heroku config:set SUPABASE_KEY=your_key
   heroku config:set JWT_SECRET=your_secret
   ```
5. Deploy:
   ```bash
   git push heroku main
   ```

### Option 2: Railway

1. Connect GitHub repository to Railway
2. Add environment variables in Railway dashboard
3. Railway auto-deploys on git push

### Option 3: AWS EC2

1. Launch EC2 instance with Node.js
2. Clone repository
3. Install dependencies
4. Configure environment variables
5. Use PM2 for process management
6. Setup Nginx as reverse proxy

## Frontend Deployment Options

### Option 1: GitHub Pages

```bash
# Create docs folder with frontend files
# Enable GitHub Pages in repository settings
# Select docs folder as source
```

### Option 2: Netlify

```bash
# Drag and drop frontend folder to Netlify
# Or connect GitHub repository
# Update API_BASE_URL to production backend URL
```

### Option 3: Vercel

```bash
# Install Vercel CLI
npm i -g vercel
# Deploy from frontend directory
vercel
```

## Post-Deployment

1. Update API_BASE_URL in frontend to production backend URL
2. Test all features in production
3. Setup monitoring and logging
4. Configure SSL/HTTPS
5. Setup automatic backups for database

## Security Considerations

- Use environment variables for secrets
- Enable HTTPS
- Configure CORS properly
- Use strong JWT secret
- Setup Web Application Firewall (WAF)
- Monitor for suspicious activities
- Implement rate limiting

## Monitoring

- Setup Sentry for error tracking
- Use Supabase analytics
- Monitor backend logs
- Setup uptime monitoring
