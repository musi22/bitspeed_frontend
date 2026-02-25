// App.jsx – Chatbot Flow Builder (BiteSpeed Frontend Task)
// Main application component wiring together all sub-components.

import { useState, useCallback, useRef } from 'react'
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  MiniMap,
} from 'reactflow'
import 'reactflow/dist/style.css'

import TextNode from './components/TextNode'
import NodesPanel from './components/NodesPanel'
import SettingsPanel from './components/SettingsPanel'
import Toast from './components/Toast'

// ── Register custom node types ───────────────────────────────────────────────
// Add new node type components here as the app grows.
const nodeTypes = {
  textNode: TextNode,
}

// ── Node ID generator ────────────────────────────────────────────────────────
let nodeIdCounter = 1
const getId = () => `node_${nodeIdCounter++}`

// ── Initial canvas state ─────────────────────────────────────────────────────
const initialNodes = [
  {
    id: 'node_0',
    type: 'textNode',
    position: { x: 280, y: 160 },
    data: { label: 'Hello! How can I help you today? 👋' },
  },
]

// ── FlowBuilder (inner component, inside ReactFlowProvider) ──────────────────
function FlowBuilder() {
  const reactFlowWrapper = useRef(null)
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [reactFlowInstance, setReactFlowInstance] = useState(null)
  const [selectedNode, setSelectedNode] = useState(null) // currently selected node
  const [toast, setToast] = useState(null) // { message, type }

  // ── Connect two nodes with an edge ────────────────────────────────────────
  // Rule: a source handle can only have ONE outgoing edge.
  const onConnect = useCallback(
    (params) => {
      const sourceAlreadyConnected = edges.some((e) => e.source === params.source)
      if (sourceAlreadyConnected) {
        setToast({
          message: 'A source handle can only have one outgoing connection.',
          type: 'error',
        })
        return
      }
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            style: { stroke: '#6366f1', strokeWidth: 2 },
            animated: true,
          },
          eds
        )
      )
    },
    [edges]
  )

  // ── Drop handler: create a new node where the user drops ──────────────────
  const onDrop = useCallback(
    (e) => {
      e.preventDefault()
      const type = e.dataTransfer.getData('application/reactflow')
      if (!type || !reactFlowInstance) return

      // Convert screen coordinates to flow coordinates
      const position = reactFlowInstance.screenToFlowPosition({
        x: e.clientX,
        y: e.clientY,
      })

      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: '' },
      }
      setNodes((nds) => nds.concat(newNode))
    },
    [reactFlowInstance, setNodes]
  )

  const onDragOver = useCallback((e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }, [])

  // ── Node selection: show settings panel ───────────────────────────────────
  const onNodeClick = useCallback((_, node) => {
    setSelectedNode(node)
  }, [])

  // ── Deselect node when clicking canvas background ─────────────────────────
  const onPaneClick = useCallback(() => {
    setSelectedNode(null)
  }, [])

  // ── Update node label from settings panel textarea ────────────────────────
  const handleTextChange = (nodeId, text) => {
    setNodes((nds) =>
      nds.map((n) =>
        n.id === nodeId ? { ...n, data: { ...n.data, label: text } } : n
      )
    )
    // Keep the settings panel in sync with the updated label
    setSelectedNode((prev) =>
      prev && prev.id === nodeId
        ? { ...prev, data: { ...prev.data, label: text } }
        : prev
    )
  }

  // ── Drag start from nodes panel ────────────────────────────────────────────
  const onDragStart = (e, nodeType) => {
    e.dataTransfer.setData('application/reactflow', nodeType)
    e.dataTransfer.effectAllowed = 'move'
  }

  // ── Save flow with validation ──────────────────────────────────────────────
  // Error condition: more than 1 node AND more than 1 node has no incoming edge.
  const handleSave = () => {
    if (nodes.length <= 1) {
      setToast({ message: 'Flow saved successfully! 🎉', type: 'success' })
      return
    }

    // Collect all node IDs that have at least one incoming edge
    const nodesWithIncoming = new Set(edges.map((e) => e.target))

    // Nodes with NO incoming edges (unconnected targets)
    const disconnectedNodes = nodes.filter((n) => !nodesWithIncoming.has(n.id))

    if (disconnectedNodes.length > 1) {
      setToast({
        message: 'Cannot save: more than one node has an empty target handle.',
        type: 'error',
      })
      return
    }

    setToast({ message: 'Flow saved successfully! 🎉', type: 'success' })
  }

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: '#0a0f1e',
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* ── Google Fonts import ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Space+Grotesk:wght@600;700&display=swap');
      `}</style>

      {/* ── Top Navigation Bar ── */}
      <header
        style={{
          height: 58,
          background: 'linear-gradient(90deg, #0f172a, #1e1b4b)',
          borderBottom: '1px solid #312e81',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          flexShrink: 0,
          zIndex: 10,
        }}
      >
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 9,
              background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 17,
              boxShadow: '0 2px 10px rgba(79,70,229,0.5)',
            }}
          >
            🤖
          </div>
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: 18,
              color: '#e0e7ff',
              letterSpacing: '-0.02em',
            }}
          >
            Flow Builder
          </span>
          <span
            style={{
              background: '#312e81',
              color: '#818cf8',
              fontSize: 10,
              fontWeight: 700,
              padding: '3px 8px',
              borderRadius: 20,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            BiteSpeed
          </span>
        </div>

        {/* Stats + Save */}
        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <span style={{ color: '#475569', fontSize: 12 }}>
            {nodes.length} node{nodes.length !== 1 ? 's' : ''} ·{' '}
            {edges.length} edge{edges.length !== 1 ? 's' : ''}
          </span>
          <button
            onClick={handleSave}
            style={{
              background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
              border: 'none',
              borderRadius: 8,
              color: '#fff',
              padding: '8px 22px',
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: '0.02em',
              transition: 'opacity 0.15s, transform 0.1s',
              boxShadow: '0 2px 12px rgba(79,70,229,0.4)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.88'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            Save Flow
          </button>
        </div>
      </header>

      {/* ── Main Content: Canvas + Sidebar ── */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

        {/* Canvas area */}
        <div ref={reactFlowWrapper} style={{ flex: 1, position: 'relative' }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            nodeTypes={nodeTypes}
            fitView
            defaultEdgeOptions={{
              style: { stroke: '#6366f1', strokeWidth: 2 },
              animated: true,
            }}
          >
            <Background
              color="#1e293b"
              gap={24}
              size={1.5}
              variant="dots"
              style={{ background: '#060d1a' }}
            />
            <Controls />
            <MiniMap
              nodeColor={() => '#4f46e5'}
              maskColor="rgba(6,13,26,0.7)"
            />
          </ReactFlow>
        </div>

        {/* Right Sidebar – Nodes Panel OR Settings Panel */}
        <aside
          style={{
            width: 248,
            background: 'linear-gradient(180deg, #0f172a 0%, #0a0f1e 100%)',
            borderLeft: '1px solid #1e293b',
            overflow: 'auto',
            flexShrink: 0,
          }}
        >
          {/* Sidebar header */}
          <div
            style={{
              padding: '16px 16px 12px',
              borderBottom: '1px solid #1e293b',
            }}
          >
            <p
              style={{
                color: '#6366f1',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                margin: 0,
              }}
            >
              {selectedNode ? '⚙️  Settings' : '🧩  Nodes Panel'}
            </p>
          </div>

          {/* Dynamic panel content */}
          {selectedNode ? (
            <SettingsPanel
              node={selectedNode}
              onTextChange={handleTextChange}
              onBack={() => setSelectedNode(null)}
            />
          ) : (
            <NodesPanel onDragStart={onDragStart} />
          )}
        </aside>
      </div>

      {/* Toast notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  )
}

// Wrap with ReactFlowProvider (required for hooks to work)
export default function App() {
  return (
    <ReactFlowProvider>
      <FlowBuilder />
    </ReactFlowProvider>
  )
}
