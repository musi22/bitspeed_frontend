// TextNode.jsx
// Custom React Flow node for displaying a chat message.
// - Target handle (top): accepts multiple incoming edges
// - Source handle (bottom): only ONE outgoing edge allowed (enforced in App)

import { Handle, Position } from 'reactflow'

const TextNode = ({ data, selected }) => {
  return (
    <div
      style={{
        background: selected
          ? 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)'
          : 'linear-gradient(135deg, #1e293b 0%, #312e81 100%)',
        border: selected ? '2px solid #818cf8' : '2px solid #4338ca',
        borderRadius: '12px',
        minWidth: 200,
        maxWidth: 260,
        fontFamily: "'DM Sans', sans-serif",
        boxShadow: selected
          ? '0 0 0 4px rgba(129,140,248,0.25), 0 8px 32px rgba(67,56,202,0.4)'
          : '0 4px 20px rgba(67,56,202,0.3)',
        transition: 'all 0.2s ease',
        overflow: 'hidden',
      }}
    >
      {/* Node header bar */}
      <div
        style={{
          background: 'linear-gradient(90deg, #4f46e5, #7c3aed)',
          padding: '8px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <span style={{ fontSize: 14 }}>💬</span>
        <span
          style={{
            color: '#e0e7ff',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          Send Message
        </span>
      </div>

      {/* Message content */}
      <div style={{ padding: '10px 14px' }}>
        <p
          style={{
            color: '#c7d2fe',
            fontSize: 13,
            margin: 0,
            lineHeight: 1.5,
            wordBreak: 'break-word',
          }}
        >
          {data.label || (
            <span style={{ color: '#6366f1', fontStyle: 'italic' }}>
              Empty message...
            </span>
          )}
        </p>
      </div>

      {/* Target handle – top, allows multiple incoming edges */}
      <Handle
        type="target"
        position={Position.Top}
        style={{
          background: '#818cf8',
          border: '2px solid #312e81',
          width: 12,
          height: 12,
          top: -7,
        }}
      />

      {/* Source handle – bottom, only one outgoing edge (enforced in App) */}
      <Handle
        type="source"
        position={Position.Bottom}
        style={{
          background: '#a78bfa',
          border: '2px solid #1e1b4b',
          width: 12,
          height: 12,
          bottom: -7,
        }}
      />
    </div>
  )
}

export default TextNode
