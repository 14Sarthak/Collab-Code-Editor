export default function Topbar({ roomId, users, language, setLanguage }) {
  const copyRoomId = () => {
    navigator.clipboard.writeText(roomId)
    alert('Room ID copied!')
  }

  return (
    <div style={{
      display: 'flex', alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 16px', height: '44px',
      background: '#252526', borderBottom: '1px solid #333'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ color: '#fff', fontWeight: 500 }}>🖥️ CodeSync</span>
        <span style={{
          fontSize: '12px', color: '#888',
          background: '#333', padding: '2px 10px', borderRadius: '20px'
        }}>
          {roomId}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <select
          value={language}
          onChange={e => setLanguage(e.target.value)}
          style={{
            background: '#333', color: '#fff', border: '1px solid #444',
            borderRadius: '6px', padding: '4px 8px', fontSize: '12px'
          }}
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="cpp">C++</option>
          <option value="java">Java</option>
        </select>

        <div style={{ display: 'flex', gap: '4px' }}>
          {users.map((u, i) => (
            <div key={i} style={{
              width: '28px', height: '28px', borderRadius: '50%',
              background: u.color, display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: '11px',
              color: '#fff', fontWeight: 500, title: u.username
            }}>
              {u.username?.[0]?.toUpperCase()}
            </div>
          ))}
        </div>

        <button onClick={copyRoomId} style={{
          background: 'transparent', color: '#7F77DD',
          border: '1px solid #7F77DD', borderRadius: '6px',
          padding: '4px 12px', fontSize: '12px'
        }}>
          Share
        </button>
      </div>
    </div>
  )
}