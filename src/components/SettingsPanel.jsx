// SettingsPanel.jsx
// Shown in the right sidebar when a node is selected.
// Provides a textarea to edit the node's message text.

const SettingsPanel = ({ node, onTextChange, onBack }) => {
  return (
    <div style={{ padding: '20px 16px' }}>
      {/* Back to nodes panel */}
      <button
        onClick={onBack}
        style={{
          background: 'none',
          border: 'none',
          color: '#818cf8',
          cursor: 'pointer',
          fontSize: 13,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: 0,
          marginBottom: 20,
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 600,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = '#a5b4fc')}
        onMouseLeave={(e) => (e.currentTarget.style.color = '#818cf8')}
      >
        ← Back
      </button>

      <p
        style={{
          color: '#94a3b8',
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          marginBottom: 14,
          marginTop: 0,
        }}
      >
        Edit Message
      </p>

      {/* Node identifier badge */}
      <div
        style={{
          background: '#1e293b',
          borderRadius: 8,
          padding: '8px 12px',
          marginBottom: 16,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <span style={{ fontSize: 14 }}>💬</span>
        <span style={{ color: '#6366f1', fontSize: 12, fontWeight: 600 }}>
          Text Node · {node.id}
        </span>
      </div>

      {/* Text editor */}
      <label
        style={{
          color: '#94a3b8',
          fontSize: 12,
          display: 'block',
          marginBottom: 8,
          fontWeight: 600,
        }}
      >
        Message Text
      </label>

      <textarea
        value={node.data.label}
        onChange={(e) => onTextChange(node.id, e.target.value)}
        placeholder="Type your message here..."
        rows={5}
        style={{
          width: '100%',
          background: '#1e293b',
          border: '1.5px solid #334155',
          borderRadius: 8,
          padding: '10px 12px',
          color: '#e2e8f0',
          fontSize: 13,
          fontFamily: "'DM Sans', sans-serif",
          resize: 'vertical',
          outline: 'none',
          boxSizing: 'border-box',
          lineHeight: 1.5,
          transition: 'border-color 0.15s',
        }}
        onFocus={(e) => (e.target.style.borderColor = '#6366f1')}
        onBlur={(e) => (e.target.style.borderColor = '#334155')}
      />

      <p style={{ color: '#475569', fontSize: 11, marginTop: 8 }}>
        {node.data.label?.length || 0} characters
      </p>
    </div>
  )
}

export default SettingsPanel
