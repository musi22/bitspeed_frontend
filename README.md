# 🤖 Chatbot Flow Builder

A visual drag-and-drop chatbot flow builder built with **React** and **React Flow**. Part of the BiteSpeed Frontend Task.

![Chatbot Flow Builder](https://img.shields.io/badge/React-18-61DAFB?logo=react) ![React Flow](https://img.shields.io/badge/React_Flow-11-FF0072) ![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)

---

## 🚀 Live Demo

> **[https://your-deployment-link.vercel.app](https://your-deployment-link.vercel.app)**
> *(Replace with your actual deployment URL after deploying)*

---

## 📋 Features

| Feature | Description |
|---|---|
| 🧩 **Text Nodes** | Drag and drop message nodes onto the canvas |
| 🎛️ **Nodes Panel** | Extensible panel listing all available node types |
| 🔗 **Edges** | Animated connections between nodes |
| ➡️ **Source Handle** | One outgoing edge per source handle (enforced) |
| ⬅️ **Target Handle** | Multiple incoming edges per target handle |
| ⚙️ **Settings Panel** | Edit node text when a node is selected |
| 💾 **Save Validation** | Error shown when more than one node has no incoming connection |

---

## 🛠️ Technology Stack

- **React 18** – UI framework
- **React Flow 11** – Node-based flow builder canvas
- **Vite 5** – Build tool and dev server
- **JavaScript (JSX)** – No TypeScript dependency

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/chatbot-flow-builder.git
cd chatbot-flow-builder

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
# http://localhost:5173
```

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
chatbot-flow-builder/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── TextNode.jsx        # Custom React Flow node
│   │   ├── NodesPanel.jsx      # Draggable node type catalog
│   │   ├── SettingsPanel.jsx   # Node text editor panel
│   │   └── Toast.jsx           # Notification component
│   ├── App.jsx                 # Main application + flow logic
│   ├── main.jsx                # React entry point
│   └── index.css               # Global styles
├── index.html
├── vite.config.js
└── package.json
```

---

## 🧩 How to Use

1. **Add Nodes** – Drag a "Message" node from the right panel onto the canvas
2. **Connect Nodes** – Click and drag from the bottom handle of one node to the top handle of another
3. **Edit Text** – Click any node to open the Settings Panel, then type your message
4. **Save Flow** – Click "Save Flow" to validate and save
   - ⚠️ An error will appear if more than one node has no incoming connections

---

## ➕ Adding New Node Types

Edit `src/components/NodesPanel.jsx` and add an entry to `nodeTypeCatalog`:

```js
export const nodeTypeCatalog = [
  {
    type: 'textNode',
    icon: '💬',
    label: 'Message',
    description: 'Send a text message',
    color: '#4f46e5',
  },
  // Add your new type here:
  {
    type: 'imageNode',
    icon: '🖼️',
    label: 'Image',
    description: 'Send an image',
    color: '#0891b2',
  },
]
```

Then register the component in `src/App.jsx`:

```js
import ImageNode from './components/ImageNode'

const nodeTypes = {
  textNode: TextNode,
  imageNode: ImageNode, // add here
}
```

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

```bash
npm run build
# Upload the dist/ folder to Netlify
```

---

## 📬 Submission

Built for: **BiteSpeed Frontend Task**  
Email: careers@bitespeed.co  
Subject: "BiteSpeed Frontend Task"

---

## 📄 License

MIT
