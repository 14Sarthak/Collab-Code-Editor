import { useEffect, useState, useRef } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { io } from 'socket.io-client'
import Editor from '../components/editor'
import Topbar from '../components/topbar'
import OutputPanel from '../components/outputpanel'

const COLORS = ['#7F77DD', '#1D9E75', '#D85A30', '#D4537E', '#BA7517']
const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL || 'http://localhost:8081'

export default function Session() {
  const { roomId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const username = location.state?.username

  const [code, setCode] = useState('// Start coding here...')
  const [language, setLanguage] = useState('javascript')
  const [users, setUsers] = useState([])

  const socketRef = useRef(null)
  const codeRef = useRef(code)

  useEffect(() => {
    if (!username) return navigate('/')

    socketRef.current = io(SOCKET_URL, {
      transports: ['websocket']
    })

    const socket = socketRef.current

    // Receive initial code
    socket.on('init', ({ code }) => {
      setCode(code)
      codeRef.current = code
    })

    // Receive code updates
    socket.on('code-update', (newCode) => {
      setCode(newCode)
      codeRef.current = newCode
    })

    // Receive all users currently in room
    socket.on('room-users', (roomUsers) => {
      setUsers(
        roomUsers.map((u, index) => ({
          ...u,
          color: COLORS[index % COLORS.length]
        }))
      )
    })

    // New user joins
    socket.on('user-joined', ({ username, socketId }) => {
      setUsers(prev => {
        if (prev.find(u => u.socketId === socketId)) return prev

        return [
          ...prev,
          {
            username,
            socketId,
            color: COLORS[prev.length % COLORS.length]
          }
        ]
      })
    })

    // User leaves
    socket.on('user-left', ({ socketId }) => {
      setUsers(prev =>
        prev.filter(user => user.socketId !== socketId)
      )
    })

    // Join AFTER all listeners are registered
    socket.emit('join-room', {
      roomId,
      username
    })

    return () => {
      socket.disconnect()
    }
  }, [roomId, username, navigate])

  const handleCodeChange = (value) => {
    setCode(value)
    codeRef.current = value

    socketRef.current?.emit('code-change', {
      roomId,
      code: value
    })
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh'
      }}
    >
      <Topbar
        roomId={roomId}
        users={users}
        language={language}
        setLanguage={setLanguage}
      />

      <div
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            padding: '6px 12px',
            background: '#252526',
            borderBottom: '1px solid #333',
            display: 'flex',
            gap: '8px'
          }}
        >
          <span
            style={{
              fontSize: '12px',
              color: '#888'
            }}
          >
            index.js
          </span>

          <button
            disabled
            style={{
              marginLeft: 'auto',
              background: '#555',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              padding: '4px 14px',
              fontSize: '12px',
              cursor: 'not-allowed',
              opacity: 0.7
            }}
          >
            Run (Coming Soon)
          </button>
        </div>

        <Editor
          code={code}
          onChange={handleCodeChange}
          language={language}
        />

        <OutputPanel />
      </div>
    </div>
  )
}