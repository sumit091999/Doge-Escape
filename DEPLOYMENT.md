# 🚀 Deployment Guide - DogeEscape

Complete guide for deploying your game to production with Vercel (Frontend) and Cloudflare R2 (Unity Build).

---

## 📋 Prerequisites

Before you start, ensure you have:

- ✅ Node.js 18+ installed
- ✅ GitHub account
- ✅ Vercel account (free tier works)
- ✅ Cloudflare account (free tier works)
- ✅ Unity WebGL build ready (960x600 resolution)

---

## Part 1: Deploy Unity Build to Cloudflare R2

### Step 1: Create R2 Bucket

1. **Login to Cloudflare Home**
   - Go to https://dash.cloudflare.com/
   - Navigate to **R2** in the sidebar

2. **Create New Bucket**
   - Click "Create Bucket"
   - Name: `dogeescape-game` (or your choice)
   - Region: Auto (or choose closest to your users)
   - Click "Create Bucket"

### Step 2: Upload Unity Build

Your Unity WebGL build should have this structure:
```
Unity_Build/
├── Build/
│   ├── Game.loader.js
│   ├── Game.data
│   ├── Game.framework.js
│   ├── Game.wasm
│   └── Game.jpg (optional)
├── TemplateData/
│   ├── style.css
│   └── favicon.ico
└── StreamingAssets/ (if exists)
```

**Upload Files:**
1. Click on your bucket
2. Click "Upload"
3. Upload the entire `Build/` folder
4. Upload `TemplateData/` folder (optional)
5. Upload `StreamingAssets/` folder (if exists)

### Step 3: Enable Public Access

1. Go to **Settings** in your bucket
2. Under **Public Access**, click "Allow Access"
3. Copy your **Public Bucket URL**: 
   ```
   https://pub-xxxxxxxxxxxxx.r2.dev
   ```

### Step 4: Configure CORS

1. In bucket settings, go to **CORS Policy**
2. Add this configuration:

```json
[
  {
    "AllowedOrigins": [
      "https://your-app.vercel.app",
      "http://localhost:3000",
      "http://localhost:5173"
    ],
    "AllowedMethods": [
      "GET",
      "HEAD"
    ],
    "AllowedHeaders": [
      "*"
    ],
    "ExposeHeaders": [],
    "MaxAgeSeconds": 3600
  }
]
```

3. Click "Save"

### Step 5: Test R2 URLs

Test these URLs in your browser:
```
https://pub-xxxxx.r2.dev/Build/Game.loader.js
https://pub-xxxxx.r2.dev/Build/Game.data
https://pub-xxxxx.r2.dev/Build/Game.framework.js
https://pub-xxxxx.r2.dev/Build/Game.wasm
```

All should download/load correctly ✅

---

## Part 2: Deploy Frontend to Vercel

### Method A: Deploy via GitHub (Recommended)

#### Step 1: Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: DogeEscape"

# Create repo on GitHub, then:
git remote add origin https://github.com/yourusername/dogeescape.git
git branch -M main
git push -u origin main
```

#### Step 2: Connect to Vercel

1. **Login to Vercel**
   - Go to https://vercel.com/
   - Click "Add New Project"

2. **Import GitHub Repository**
   - Select your `dogeescape` repo
   - Click "Import"

3. **Configure Project**
   - Framework Preset: **Vite**
   - Root Directory: `./` (default)
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. **Add Environment Variables**
   Click "Environment Variables" and add:
   
   ```
   Name: VITE_UNITY_BUILD_URL
   Value: https://pub-xxxxx.r2.dev
   
   Name: VITE_API_URL
   Value: https://your-backend-api.com (if applicable)
   
   Name: VITE_CHAIN_ID
   Value: 1
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for build
   - Get your URL: `https://dogeescape.vercel.app`

### Method B: Deploy via CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# For production
vercel --prod
```

---

## Part 3: Update CORS After Deployment

Once you have your Vercel URL, update R2 CORS:

1. Go back to Cloudflare R2 bucket
2. Update CORS policy with your actual Vercel URL:

```json
[
  {
    "AllowedOrigins": [
      "https://dogeescape.vercel.app",
      "https://your-custom-domain.com",
      "http://localhost:3000"
    ],
    "AllowedMethods": ["GET", "HEAD"],
    "AllowedHeaders": ["*"],
    "MaxAgeSeconds": 3600
  }
]
```

---

## Part 4: Custom Domain (Optional)

### Vercel Custom Domain

1. **Add Domain in Vercel**
   - Go to Project Settings → Domains
   - Add your domain: `dogeescape.xyz`
   - Follow DNS instructions

2. **DNS Settings (Example)**
   ```
   Type: CNAME
   Name: @
   Value: cname.vercel-dns.com
   ```

### R2 Custom Domain

1. **Add Custom Domain in R2**
   - Go to R2 bucket settings
   - Click "Custom Domains"
   - Add: `cdn.dogeescape.xyz`

2. **Update DNS**
   ```
   Type: CNAME
   Name: cdn
   Value: your-bucket.r2.cloudflarestorage.com
   ```

3. **Update .env.production**
   ```env
   VITE_UNITY_BUILD_URL=https://cdn.dogeescape.xyz
   ```

---

## Part 5: Environment Variables Management

### Local Development (.env)
```env
VITE_UNITY_BUILD_URL=http://localhost:3000/Build
VITE_API_URL=http://localhost:5000
VITE_CHAIN_ID=1337
```

### Production (.env.production)
```env
VITE_UNITY_BUILD_URL=https://pub-xxxxx.r2.dev
VITE_API_URL=https://api.dogeescape.xyz
VITE_CHAIN_ID=1
```

### Update Vercel Environment Variables

```bash
# Via CLI
vercel env add VITE_UNITY_BUILD_URL production
# Then enter: https://pub-xxxxx.r2.dev

# Or via Home
# Settings → Environment Variables → Add
```

---

## Part 6: Verify Deployment

### Testing Checklist

After deployment, test:

1. **Frontend Loads**
   - [ ] Visit your Vercel URL
   - [ ] Landing page displays correctly
   - [ ] All images/assets load

2. **Wallet Connection**
   - [ ] Connect wallet button works
   - [ ] MetaMask/Zerion connects
   - [ ] Wallet address displays

3. **Game Loads**
   - [ ] Click "Play Now"
   - [ ] Loading screen appears
   - [ ] Unity game loads from R2
   - [ ] Game is playable (960x600)

4. **UI Components**
   - [ ] Leaderboard displays
   - [ ] Daily tasks show
   - [ ] In-app items panel works
   - [ ] Chat components work

5. **Responsive Design**
   - [ ] Works on desktop (1920x1080)
   - [ ] Works on tablet (768px)
   - [ ] Works on mobile (375px)

6. **Performance**
   - [ ] Page loads < 3 seconds
   - [ ] Unity loads < 10 seconds
   - [ ] No console errors
   - [ ] Smooth animations

---

## Part 7: Monitoring & Analytics

### Vercel Analytics

1. **Enable Analytics**
   - Go to Project Settings → Analytics
   - Enable Web Analytics (free)

2. **View Metrics**
   - Page views
   - Load times
   - Geographic data

### Error Tracking

Add Sentry (optional):

```bash
npm install @sentry/react
```

```javascript
// src/main.jsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: import.meta.env.MODE,
});
```

---

## Part 8: CI/CD Pipeline

### GitHub Actions (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm install
        
      - name: Build
        run: npm run build
        env:
          VITE_UNITY_BUILD_URL: ${{ secrets.VITE_UNITY_BUILD_URL }}
          
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

---

## Part 9: Rollback Strategy

### Vercel Rollback

```bash
# List deployments
vercel ls

# Rollback to previous
vercel rollback [deployment-url]
```

Or via Home:
1. Go to Deployments
2. Find previous working version
3. Click "Promote to Production"

### R2 Rollback

Keep backups of Unity builds:
```
r2-bucket/
├── v1.0.0/
├── v1.0.1/
└── v1.0.2/ (current)
```

Update env to point to previous version if needed.

---

## Part 10: Production Checklist

Before going live:

### Security
- [ ] Environment variables set correctly
- [ ] API keys are secret
- [ ] CORS configured properly
- [ ] HTTPS enabled (automatic with Vercel)

### Performance
- [ ] Build size < 500KB
- [ ] Images optimized
- [ ] Lazy loading enabled
- [ ] Caching configured

### SEO
- [ ] Meta tags added
- [ ] sitemap.xml created
- [ ] robots.txt configured
- [ ] Open Graph tags added

### Legal
- [ ] Terms of Service added
- [ ] Privacy Policy added
- [ ] Cookie consent (if EU users)

---

## 🆘 Troubleshooting

### Unity Build Not Loading

**Problem**: Game shows loading screen forever

**Solutions**:
1. Check R2 bucket URLs are correct
2. Verify CORS is configured
3. Check browser console for errors
4. Test R2 URLs directly in browser

### Wallet Connection Fails

**Problem**: MetaMask won't connect

**Solutions**:
1. Check Web3 provider is initialized
2. Verify chain ID is correct
3. Test on different browser
4. Clear browser cache

### Build Fails on Vercel

**Problem**: Deployment fails

**Solutions**:
1. Check build logs in Vercel
2. Verify all dependencies in package.json
3. Test `npm run build` locally
4. Check Node.js version compatibility

### CORS Errors

**Problem**: "Access-Control-Allow-Origin" error

**Solutions**:
1. Update R2 CORS with correct domains
2. Wait 5 minutes for propagation
3. Clear browser cache
4. Check Vercel URL is correct

---

## 📞 Support

Need help?
- **Email**: contact@galacticos.com
- **Discord**: [Join Community](https://discord.gg/galacticos)
- **GitHub Issues**: [Report Bug](https://github.com/bigclitphobia/dogeescapegame/issues)

---

## 🎉 Congratulations!

Your game is now live! 🚀

**Next Steps**:
1. Share your game URL
2. Monitor analytics
3. Gather user feedback
4. Plan updates and new features

---

**Galacticos Corporation**  
*Every Frame Matters* 🎮
