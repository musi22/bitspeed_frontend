# ⚡ Quick Start Guide

## 1️⃣ Installation & Setup

```bash
# Navigate to project
cd chatbot-flow-builder

# Install dependencies (do this once)
npm install

# Start development server
npm run dev

# Open browser to: http://localhost:5173
```

---

## 2️⃣ How to Use the App

### Adding Nodes
- **Drag** a "Message" node from the right panel onto the canvas
- Release to place the node

### Editing Messages
1. **Click** a node on the canvas
2. The **Settings Panel** appears on the right
3. **Type** your message in the text area
4. Changes are saved automatically

### Connecting Nodes
1. Hover over the **bottom handle** (yellow circle) of a node
2. **Click and drag** to another node's **top handle** (blue circle)
3. An animated line (edge) connects them
4. **Note:** One source can only have ONE outgoing connection

### Saving Your Flow
1. Click the **"Save Flow"** button (top-right)
2. ✅ **Success!** Flow with valid connections
3. ⚠️ **Error:** More than one unconnected node

---

## 3️⃣ Available Commands

```bash
# Development server (with hot reload)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Install new packages
npm install [package-name]
```

---

## 4️⃣ Project Structure

```
src/
├── App.jsx                    # Main app + flow logic
├── components/
│   ├── TextNode.jsx          # Node component
│   ├── NodesPanel.jsx        # Drag-drop panel
│   ├── SettingsPanel.jsx     # Text editor
│   └── Toast.jsx             # Notifications
├── index.css                 # Global styles
└── main.jsx                  # Entry point
```

---

## 5️⃣ Deployment Options

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

**Quick Deploy to Vercel:**
```bash
npm install -g vercel
vercel
```

---

## 6️⃣ Features

✅ Drag-and-drop node interface  
✅ Multiple message nodes  
✅ Animated connections  
✅ Real-time text editing  
✅ Flow validation on save  
✅ Beautiful dark UI  
✅ Fully responsive  
✅ Extensible architecture  

---

## 7️⃣ Extending the App

### Add a New Node Type

1. **Create component** `src/components/ImageNode.jsx`
2. **Add to catalog** in `NodesPanel.jsx`:
   ```js
   { type: 'imageNode', icon: '🖼️', label: 'Image', ... }
   ```
3. **Register in App.jsx**:
   ```js
   import ImageNode from './components/ImageNode'
   const nodeTypes = { ..., imageNode: ImageNode }
   ```

---

## 📞 Support

- Check [README.md](./README.md) for full documentation
- See [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment help

**Happy building! 🚀**
