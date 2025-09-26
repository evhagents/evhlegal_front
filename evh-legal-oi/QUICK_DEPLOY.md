# 🚀 Quick Public Deployment Guide

## Option 1: Railway (Recommended - 5 minutes)

### Step 1: Sign up
1. Go to [railway.app](https://railway.app)
2. Click "Start a New Project"
3. Sign up with GitHub

### Step 2: Deploy
1. Click "Deploy from GitHub repo"
2. Select your `evhlegal_front` repository
3. Railway auto-detects the Dockerfile
4. Click "Deploy Now"

### Step 3: Configure
1. Go to your project dashboard
2. Click "Variables" tab
3. Add environment variables:
   ```
   OPENAI_API_KEY = your_openai_api_key_here
   NODE_ENV = production
   ```
4. Click "Save"

### Step 4: Get your URL
- Railway provides: `https://your-app-name.railway.app`
- Your app is now live! 🎉

---

## Option 2: Render (10 minutes)

### Step 1: Sign up
1. Go to [render.com](https://render.com)
2. Sign up with GitHub

### Step 2: Create Web Service
1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Select your repository

### Step 3: Configure
- **Name:** `evh-legal-frontend`
- **Environment:** `Docker`
- **Dockerfile Path:** `evh-legal-oi/Dockerfile`
- **Root Directory:** `evh-legal-oi`

### Step 4: Environment Variables
Add in the Render dashboard:
```
OPENAI_API_KEY = your_openai_api_key_here
NODE_ENV = production
```

### Step 5: Deploy
1. Click "Create Web Service"
2. Wait for deployment (5-10 minutes)
3. Get your URL: `https://evh-legal-frontend.onrender.com`

---

## Option 3: DigitalOcean App Platform (15 minutes)

### Step 1: Create App
1. Go to [DigitalOcean App Platform](https://cloud.digitalocean.com/apps)
2. Click "Create App"
3. Connect GitHub repository

### Step 2: Configure
- **Source:** Your GitHub repo
- **Type:** Docker
- **Dockerfile Path:** `evh-legal-oi/Dockerfile`

### Step 3: Environment Variables
Add in the dashboard:
```
OPENAI_API_KEY = your_openai_api_key_here
NODE_ENV = production
```

### Step 4: Deploy
1. Click "Create Resources"
2. Wait for deployment
3. Get your URL: `https://your-app-name.ondigitalocean.app`

---

## 🔧 Environment Variables Needed

Make sure to set these in your deployment platform:

### Required:
```bash
OPENAI_API_KEY=your_openai_api_key_here
NODE_ENV=production
```

### Optional (for future Phoenix integration):
```bash
PHOENIX_API_URL=https://your-phoenix-backend.com
```

---

## 🎯 Recommended: Railway

**Why Railway?**
- ✅ **Fastest setup** (5 minutes)
- ✅ **Free tier** (500 hours/month)
- ✅ **Auto HTTPS** and custom domains
- ✅ **GitHub integration** with auto-deploy
- ✅ **Great Docker support**
- ✅ **Simple environment variable management**

**Cost:** Free for development, $5/month for production

---

## 🚨 Important Notes

1. **Environment Variables:** Make sure to set `OPENAI_API_KEY` or the AI features won't work
2. **Custom Domain:** All platforms support custom domains (usually $10-15/year)
3. **SSL/HTTPS:** Automatically provided by all platforms
4. **Auto-Deploy:** Set up to deploy automatically when you push to main branch

---

## 🆘 Troubleshooting

### Build Fails
- Check that `Dockerfile` is in the `evh-legal-oi` directory
- Verify all dependencies are in `package.json`

### App Won't Start
- Check environment variables are set correctly
- Look at deployment logs in the platform dashboard

### 404 Errors
- Ensure `NODE_ENV=production` is set
- Check that the app is using the standalone build

---

## 🎉 You're Live!

Once deployed, your EVH Legal dashboard will be available at your platform's URL with:
- ✅ AI document analysis
- ✅ Compliance dashboard  
- ✅ Entity management
- ✅ User personas
- ✅ All features working in production

**Next Steps:**
1. Test all features on your live URL
2. Set up a custom domain (optional)
3. Configure monitoring (optional)
4. Prepare for Phoenix backend integration
