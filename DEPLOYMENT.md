# 🚀 Deployment Guide – Chatbot Flow Builder

This guide will help you deploy the Chatbot Flow Builder to Vercel (recommended).

---

## **Option 1: Deploy to Vercel (Recommended) ✨**

### Step 1: Push to GitHub
```bash
cd chatbot-flow-builder

# Initialize Git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Chatbot Flow Builder"

# Create a new repository on GitHub:
# https://github.com/new
# Name it: chatbot-flow-builder

# Add remote and push
git remote add origin https://github.com/YOUR_USERNAME/chatbot-flow-builder.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel
**Option A: Using Vercel CLI**
```bash
npm install -g vercel
vercel
# Follow the prompts to deploy
```

**Option B: Using Vercel Web Dashboard**
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "New Project"
4. Select your `chatbot-flow-builder` repository
5. Click "Deploy"
6. Your live link will be provided (e.g., `https://chatbot-flow-builder.vercel.app`)

---

## **Option 2: Deploy to Netlify**

### Step 1: Build the project
```bash
npm run build
# Creates a `dist/` folder
```

### Step 2: Deploy
**Option A: Using Netlify CLI**
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

**Option B: Using Netlify Web Dashboard**
1. Go to [netlify.com](https://netlify.com)
2. Sign up with GitHub
3. Click "New site from Git"
4. Select your repository
5. Build command: `npm run build`
6. Publish directory: `dist`
7. Click "Deploy"

---

## **Option 3: Deploy to GitHub Pages**

### Step 1: Update vite.config.js
```js
export default {
  base: '/chatbot-flow-builder/',
  plugins: [react()],
}
```

### Step 2: Build & Deploy
```bash
npm run build
npx gh-pages -d dist
```

---

## **After Deployment**

1. **Update README.md** with your live link
2. **Test** the live app in your browser
3. **Share** your submission link

---

## **Environment Variables** (if needed)

Create a `.env` file:
```
VITE_API_URL=https://your-api.com
```

Access in code:
```js
const apiUrl = import.meta.env.VITE_API_URL
```

---

## **Troubleshooting**

| Issue | Solution |
|---|---|
| Build fails | Run `npm run build` locally first to debug |
| Port 5173 occupied | Run `npm run dev -- --port 3000` |
| Missing dependencies | Run `npm install` |
| Git not initialized | Run `git init` in project folder |

---

**Good luck with your deployment! 🎉**
