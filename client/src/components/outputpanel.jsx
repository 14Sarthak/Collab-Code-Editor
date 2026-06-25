export default function OutputPanel() {
  return (
    <div
      style={{
        height: '140px',
        background: '#1e1e1e',
        color: '#fff',
        borderTop: '1px solid #333',
        padding: '16px'
      }}
    >
      <h3
        style={{
          margin: 0,
          marginBottom: '10px',
          fontSize: '14px'
        }}
      >
        Output
      </h3>

      <div
        style={{
          color: '#999',
          fontSize: '13px',
          lineHeight: '1.6'
        }}
      >
        🚀 <strong>Code execution support coming soon.</strong>
        <br />
        This version focuses on real-time collaborative editing with live synchronization.
      </div>
    </div>
  )
}