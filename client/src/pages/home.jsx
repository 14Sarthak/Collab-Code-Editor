import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Home() {
  const [username, setUsername] = useState('')
  const [roomId, setRoomId] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const createSession = async () => {
    if (!username.trim()) return alert('Enter your name')
    setLoading(true)
    try {
      const res = await axios.post('http://localhost:8081/api/session/create')
      navigate(`/session/${res.data.roomId}`, { state: { username } })
    } catch (err) {
      alert('Failed to create session')
    }
    setLoading(false)
  }

  const joinSession = () => {
    if (!username.trim()) return alert('Enter your name')
    if (!roomId.trim()) return alert('Enter a room ID')
    navigate(`/session/${roomId}`, { state: { username } })
  }

  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      height: '100vh', gap: '16px'
    }}>
      <h1 style={{ fontSize: '32px', color: '#fff', marginBottom: '8px' }}>
        🖥️ CodeSync
      </h1>
      <p style={{ color: '#888', marginBottom: '24px' }}>
        Real-time collaborative code editor
      </p>

      <input
        placeholder="Your name"
        value={username}
        onChange={e => setUsername(e.target.value)}
        style={inputStyle}
      />

      <button onClick={createSession} disabled={loading} style={btnPrimary}>
        {loading ? 'Creating...' : '+ Create new session'}
      </button>

      <div style={{ color: '#555', fontSize: '13px' }}>— or join existing —</div>

      <input
        placeholder="Room ID"
        value={roomId}
        onChange={e => setRoomId(e.target.value)}
        style={inputStyle}
      />

      <button onClick={joinSession} style={btnSecondary}>
        Join session
      </button>
    </div>
  )
}

const inputStyle = {
  padding: '10px 16px', borderRadius: '8px',
  border: '1px solid #444', background: '#2d2d2d',
  color: '#fff', fontSize: '14px', width: '280px', outline: 'none'
}

const btnPrimary = {
  padding: '10px 24px', borderRadius: '8px',
  background: '#7F77DD', color: '#fff',
  border: 'none', fontSize: '14px', width: '280px'
}

const btnSecondary = {
  padding: '10px 24px', borderRadius: '8px',
  background: 'transparent', color: '#7F77DD',
  border: '1px solid #7F77DD', fontSize: '14px', width: '280px'
}