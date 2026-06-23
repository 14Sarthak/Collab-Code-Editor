export default function OutputPanel({ output, loading }) {
  return (
    <div style={{
      height: '160px', background: '#1a1a1a',
      borderTop: '1px solid #333', display: 'flex', flexDirection: 'column'
    }}>
      <div style={{
        padding: '0 12px', height: '30px', background: '#252526',
        borderBottom: '1px solid #333', display: 'flex', alignItems: 'center',
        fontSize: '12px', color: '#888', gap: '8px'
      }}>
        <span>⬛ Output</span>
        {loading && <span style={{ color: '#7F77DD' }}>Running...</span>}
      </div>
      <div style={{
        fontFamily: 'monospace', fontSize: '13px',
        padding: '8px 12px', flex: 1, overflow: 'auto',
        color: output?.error ? '#f48771' : '#d4d4d4'
      }}>
        {loading ? 'Executing...' : (output?.stdout || output?.stderr || output?.error || 'Click Run to execute code')}
      </div>
    </div>
  )
}