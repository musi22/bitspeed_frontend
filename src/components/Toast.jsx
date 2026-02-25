// Toast.jsx
// Temporary notification banner shown at the top of the screen.
// Auto-dismisses after 3 seconds.

import { useEffect } from 'react'

const Toast = ({ message, type, onClose }) => {
  // Auto-close after 3 seconds
  useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  const isError = type === 'error'

  return (
    <div
      style={{
        position: 'fixed',
        top: 80,
        left: '50%',
        transform: 'translateX(-50%)',
        background: isError ? '#7f1d1d' : '#14532d',
        border: `1.5px solid ${isError ? '#ef4444' : '#22c55e'}`,
        borderRadius: 10,
        padding: '12px 22px',
        color: isError ? '#fca5a5' : '#86efac',
        fontSize: 13,
        fontWeight: 600,
        fontFamily: "'DM Sans', sans-serif",
        zIndex: 9999,
        boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        animation: 'slideDown 0.3s ease',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
      }}
      onClick={onClose}
      title="Click to dismiss"
    >
      <span>{isError ? '⚠️' : '✅'}</span>
      {message}
    </div>
  )
}

export default Toast
