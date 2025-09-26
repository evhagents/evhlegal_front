# Public Deployment Options for EVH Legal

## 🚀 Quick Deploy Options

### Option 1: Railway (Recommended - Easiest)
**Cost:** Free tier available, $5/month for production
**Setup Time:** 5 minutes

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

**Features:**
- Automatic HTTPS
- Environment variables UI
- GitHub integration
- Custom domains
- Auto-deploy on git push

### Option 2: Render
**Cost:** Free tier available, $7/month for production
**Setup Time:** 10 minutes

1. Connect GitHub repo to Render
2. Select "Web Service"
3. Choose Docker deployment
4. Set environment variables
5. Deploy!

### Option 3: DigitalOcean App Platform
**Cost:** $5/month minimum
**Setup Time:** 15 minutes

1. Create new app in DigitalOcean
2. Connect GitHub repo
3. Configure as Docker service
4. Set environment variables
5. Deploy!

### Option 4: AWS/GCP/Azure
**Cost:** $10-50/month
**Setup Time:** 30+ minutes

More complex but full control and enterprise features.

## 🐳 Docker-Specific Deployments

### Railway Configuration
Create `railway.json`:
```json
{
  "build": {
    "builder": "DOCKERFILE",
    "dockerfilePath": "Dockerfile"
  },
  "deploy": {
    "startCommand": "node server.js",
    "healthcheckPath": "/",
    "healthcheckTimeout": 100,
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### Render Configuration
Create `render.yaml`:
```yaml
services:
  - type: web
    name: evh-legal-frontend
    env: docker
    dockerfilePath: ./Dockerfile
    envVars:
      - key: NODE_ENV
        value: production
      - key: OPENAI_API_KEY
        fromService:
          type: secret
          name: openai-api-key
    healthCheckPath: /
```

## 🔧 Environment Variables Setup

### Required Variables:
```bash
OPENAI_API_KEY=your_openai_api_key_here
NODE_ENV=production
```

### Optional Variables:
```bash
PHOENIX_API_URL=https://your-phoenix-backend.com
VERCEL_ANALYTICS_ID=your_analytics_id
```

## 📋 Pre-Deployment Checklist

- [ ] Docker build works locally
- [ ] Environment variables configured
- [ ] Domain name ready (optional)
- [ ] SSL certificate (auto-handled by most platforms)
- [ ] Monitoring/logging setup (optional)

## 🎯 Recommended: Railway Deployment

Railway is the easiest for Docker deployments:

1. **Sign up** at [railway.app](https://railway.app)
2. **Connect GitHub** repository
3. **Deploy from GitHub** - Railway auto-detects Dockerfile
4. **Set environment variables** in Railway dashboard
5. **Get public URL** - Railway provides HTTPS URL immediately

### Railway Commands:
```bash
# Deploy via CLI
railway login
railway link
railway up

# Set environment variables
railway variables set OPENAI_API_KEY=your_key_here

# View logs
railway logs

# Open in browser
railway open
```

## 🔄 CI/CD Setup

### GitHub Actions (Railway)
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Railway
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install -g @railway/cli
      - run: railway up --service
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}
```

## 💰 Cost Comparison

| Platform | Free Tier | Production Cost | Setup Time |
|----------|-----------|-----------------|------------|
| Railway  | ✅ 500 hours | $5/month | 5 min |
| Render   | ✅ 750 hours | $7/month | 10 min |
| DigitalOcean | ❌ | $5/month | 15 min |
| AWS/GCP  | ❌ | $10-50/month | 30+ min |

## 🚀 Quick Start: Railway

1. **Go to** [railway.app](https://railway.app)
2. **Sign up** with GitHub
3. **Click "Deploy from GitHub"**
4. **Select your repository**
5. **Railway auto-detects Dockerfile**
6. **Add environment variables:**
   - `OPENAI_API_KEY`
   - `NODE_ENV=production`
7. **Deploy!** Get your public URL in 2 minutes

Your app will be live at: `https://your-app-name.railway.app`
