// NodesPanel.jsx
// Displays all available node types as draggable cards.
// To add a new node type, just push an entry to nodeTypeCatalog.

// ── Node type catalog ────────────────────────────────────────────────────────
// Extend this array to support more node types in the future.
export const nodeTypeCatalog = [
  {
    type: 'textNode',
    icon: '💬',
    label: 'Message',
    description: 'Send a text message',
    color: '#4f46e5',
  },
  // Uncomment to add future node types:
  // { type: 'imageNode', icon: '🖼️', label: 'Image', description: 'Send an image', color: '#0891b2' },
  // { type: 'buttonNode', icon: '🔘', label: 'Buttons', description: 'Show quick replies', color: '#059669' },
  // { type: 'delayNode', icon: '⏱️', label: 'Delay', description: 'Add a wait step', color: '#d97706' },
]

const NodesPanel = ({ onDragStart }) => {
  return (
    <div style={{ padding: '20px 16px' }}>
      <p
        style={{
          color: '#94a3b8',
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          marginBottom: 16,
          marginTop: 0,
        }}
      >
        Node Types
      </p>

      {nodeTypeCatalog.map((n) => (
        <div
          key={n.type}
          draggable
          onDragStart={(e) => onDragStart(e, n.type)}
          style={{
            background: 'linear-gradient(135deg, #1e293b, #1a1a2e)',
            border: `1.5px solid ${n.color}55`,
            borderRadius: 10,
            padding: '12px 14px',
            cursor: 'grab',
            marginBottom: 10,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            transition: 'all 0.15s ease',
            userSelect: 'none',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = n.color
            e.currentTarget.style.background = 'linear-gradient(135deg, #1e293b, #1e1b4b)'
            e.currentTarget.style.transform = 'translateY(-1px)'
            e.currentTarget.style.boxShadow = `0 4px 16px ${n.color}40`
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = `${n.color}55`
            e.currentTarget.style.background = 'linear-gradient(135deg, #1e293b, #1a1a2e)'
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          {/* Icon badge */}
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: `${n.color}22`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 18,
              flexShrink: 0,
            }}
          >
            {n.icon}
          </div>

          {/* Label and description */}
          <div>
            <div style={{ color: '#e2e8f0', fontSize: 13, fontWeight: 600 }}>
              {n.label}
            </div>
            <div style={{ color: '#64748b', fontSize: 11, marginTop: 2 }}>
              {n.description}
            </div>
          </div>
        </div>
      ))}

      <p
        style={{
          color: '#475569',
          fontSize: 11,
          textAlign: 'center',
          marginTop: 20,
          lineHeight: 1.6,
        }}
      >
        Drag nodes onto
        <br />
        the canvas
      </p>
    </div>
  )
}

export default NodesPanel
