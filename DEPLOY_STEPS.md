# 📋 Step-by-Step Deployment Guide

Complete walkthrough to deploy your Chatbot Flow Builder to production.

---

## **OPTION 1: Deploy to Vercel (Easiest & Recommended) ⭐**

### **Step 1: Sign Up / Login to Vercel**
1. Go to **https://vercel.com**
2. Click **"Sign Up"** or **"Login"**
3. Choose **"Continue with GitHub"**
4. Authorize Vercel to access your GitHub account

### **Step 2: Import Your Repository**
1. After login, click **"Add New Project"**
2. Under "Import Git Repository", paste:
   ```
   https://github.com/musi22/bitspeed_frontend
   ```
3. Click **"Continue"**

### **Step 3: Configure Project**
1. **Project Name:** `bitspeed-flow-builder` (or any name you prefer)
2. **Framework Preset:** Select **"Vite"** (or leave auto-detected)
3. **Root Directory:** Leave blank (unless in subdirectory)
4. **Build Command:** `npm run build` (should auto-fill)
5. **Output Directory:** `dist` (should auto-fill)

### **Step 4: Deploy**
1. Click **"Deploy"**
2. Wait for build to complete (usually 1-2 minutes)
3. ✅ Your app is LIVE! You'll get a URL like:
   ```
   https://bitspeed-flow-builder.vercel.app
   ```

### **Step 5: Update README with Live Link**
1. Go to your GitHub repository
2. Edit `README.md`
3. Replace the deployment link placeholder with your Vercel URL
4. Commit and push

---

## **OPTION 2: Deploy to Netlify**

### **Step 1: Build Your Project Locally**
```powershell
cd "c:\Users\RASHMI\Desktop\bitspeed_frontend\chatbot-flow-builder"
npm run build
```
This creates a `dist/` folder with your production files.

### **Step 2: Sign Up / Login to Netlify**
1. Go to **https://netlify.com**
2. Click **"Sign up"** or **"Log in"**
3. Choose **"Sign up with GitHub"**

### **Step 3: Connect Your Repository**
1. Click **"New site from Git"**
2. Choose **"GitHub"**
3. Find and select **`musi22/bitspeed_frontend`**

### **Step 4: Configure Build Settings**
- **Base directory:** Leave empty
- **Build command:** `npm run build`
- **Publish directory:** `dist`
- Click **"Deploy site"**

### **Step 5: Wait for Deployment**
- Netlify will automatically:
  - Install dependencies
  - Run build command
  - Deploy to their servers
- Your URL will be shown (e.g., `https://chatbot-flow-builder.netlify.app`)

---

## **OPTION 3: Deploy to GitHub Pages**

### **Step 1: Update vite.config.js**
```javascript
export default {
  base: '/bitspeed_frontend/',  // Your repo name
  // ... rest of config
}
```

### **Step 2: Build & Deploy**
```powershell
npm run build
git add dist
git commit -m "Build: Production deployment"
git push origin main
```

### **Step 3: Enable GitHub Pages**
1. Go to your GitHub repo → **Settings**
2. Scroll to **"Pages"**
3. Set **Source** to **"Deploy from a branch"**
4. Select **"main"** branch, **"/root"** folder
5. Click **"Save"**
6. Your site will be at: `https://musi22.github.io/bitspeed_frontend/`

---

## **OPTION 4: Deploy with Docker**

### **Step 1: Create Dockerfile**
```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
```

### **Step 2: Build & Run**
```bash
docker build -t chatbot-flow-builder .
docker run -p 3000:3000 chatbot-flow-builder
```

### **Step 3: Deploy to Container Registry**
- Push to Docker Hub
- Deploy to AWS, Google Cloud, or Heroku

---

## **Recommended: Vercel Deployment Summary**

| Step | Action | Time |
|------|--------|------|
| 1 | Sign up at vercel.com | 2 min |
| 2 | Connect GitHub repo | 1 min |
| 3 | Import repository | 1 min |
| 4 | Configure (auto-filled) | 1 min |
| 5 | Click Deploy | 2 min |
| 6 | **LIVE!** ✅ | **Total: 7 mins** |

---

## **Post-Deployment Checklist**

- [ ] App loads without errors
- [ ] Can drag/drop nodes
- [ ] Can connect nodes with edges
- [ ] Settings panel opens on node click
- [ ] Save button validates correctly
- [ ] Toast notifications appear
- [ ] Update README with live URL
- [ ] Share deployment link

---

## **Troubleshooting**

### **Build Fails**
```bash
# Check locally first
npm run build
npm run preview  # Test production build
```

### **Port Already in Use**
```bash
npm run dev -- --port 3001
```

### **Module Not Found**
```bash
rm -r node_modules package-lock.json
npm install
npm run build
```

### **Vercel Dashboard Issues**
1. Go to https://vercel.com/dashboard
2. Find your project
3. Click **"Deployments"** tab
4. Check build logs for errors
5. Redeploy with **"Redeploy"** button

---

## **Environment Variables (if needed)**

Create `.env.local`:
```
VITE_API_URL=https://api.example.com
VITE_APP_NAME=Chatbot Flow Builder
```

Access in code:
```javascript
const apiUrl = import.meta.env.VITE_API_URL
```

---

## **Custom Domain (Optional)**

### **On Vercel:**
1. Go to Project Settings → Domains
2. Add your custom domain (e.g., `chatbot.bitspeed.co`)
3. Update DNS records as shown
4. DNS propagates in 5-30 minutes

### **On Netlify:**
1. Go to Domain Management
2. Add Custom Domain
3. Update your domain's nameservers

---

## **Get Help**

- **Vercel Docs:** https://vercel.com/docs
- **Netlify Docs:** https://docs.netlify.com
- **Vite Guide:** https://vitejs.dev/guide/static-deploy.html
- **React Flow Docs:** https://reactflow.dev

---

**Your app will be production-ready in minutes! 🚀**
