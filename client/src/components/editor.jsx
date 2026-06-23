export default function Editor({ code, onChange, language }) {
  return (
    <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
      <textarea
        value={code}
        onChange={e => onChange(e.target.value)}
        spellCheck={false}
        style={{
          width: '100%',
          height: '100%',
          background: '#1e1e1e',
          color: '#d4d4d4',
          fontFamily: "'Fira Code', 'Courier New', monospace",
          fontSize: '14px',
          lineHeight: '1.7',
          padding: '12px 16px',
          border: 'none',
          outline: 'none',
          resize: 'none',
          tabSize: 2,
        }}
        onKeyDown={e => {
          // Tab key inserts spaces instead of changing focus
          if (e.key === 'Tab') {
            e.preventDefault()
            const start = e.target.selectionStart
            const end = e.target.selectionEnd
            const newCode = code.substring(0, start) + '  ' + code.substring(end)
            onChange(newCode)
          }
        }}
      />
    </div>
  )
}