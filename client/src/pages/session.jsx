import { useEffect, useState, useRef } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { io } from 'socket.io-client'
import axios from 'axios'
import Editor from '../components/editor'
import Topbar from '../components/topbar'
import OutputPanel from '../components/outputpanel'

const COLORS = ['#7F77DD', '#1D9E75', '#D85A30', '#D4537E', '#BA7517']
const SOCKET_URL = 'http://localhost:8081'

export default function Session() {
  const { roomId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const username = location.state?.username

  const [code, setCode] = useState('// Start coding here...')
  const [language, setLanguage] = useState('javascript')
  const [users, setUsers] = useState([])
  const [output, setOutput] = useState(null)
  const [running, setRunning] = useState(false)
  const socketRef = useRef(null)
  const codeRef = useRef(code)

  useEffect(() => {
    if (!username) return navigate('/')

    socketRef.current = io(SOCKET_URL, { transports: ['websocket'] })
    const socket = socketRef.current

    socket.emit('join-room', { roomId, username })

    socket.on('init', ({ code }) => {
      setCode(code)
      codeRef.current = code
    })

    socket.on('code-update', (newCode) => {
      setCode(newCode)
      codeRef.current = newCode
    })

    socket.on('user-joined', ({ username, socketId }) => {
      setUsers(prev => {
        if (prev.find(u => u.socketId === socketId)) return prev
        return [...prev, { username, socketId, color: COLORS[prev.length % COLORS.length] }]
      })
    })

    socket.on('user-left', ({ socketId }) => {
      setUsers(prev => prev.filter(u => u.socketId !== socketId))
    })

    setUsers([{ username, socketId: 'me', color: COLORS[0] }])

    return () => socket.disconnect()
  }, [roomId, username])

  const handleCodeChange = (value) => {
    setCode(value)
    codeRef.current = value
    socketRef.current?.emit('code-change', { roomId, code: value })
  }

  const runCode = async () => {
  setRunning(true)
  setOutput(null)
  try {
    const langMap = {
      javascript: 63,
      python: 71,
      cpp: 54,
      java: 62
    }

    // Submit code
    const submitRes = await axios.post(
      'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true',
      {
        source_code: codeRef.current,
        language_id: langMap[language],
        stdin: ''
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    const data = submitRes.data
    setOutput({
      stdout: data.stdout || '',
      stderr: data.stderr || '',
      error: data.compile_output || data.message || ''
    })
  } catch (err) {
    setOutput({ error: 'Code execution failed. Try again.' })
  }
  setRunning(false)
}

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Topbar
        roomId={roomId}
        users={users}
        language={language}
        setLanguage={setLanguage}
      />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', flexDirection: 'column' }}>
        <div style={{ padding: '6px 12px', background: '#252526', borderBottom: '1px solid #333', display: 'flex', gap: '8px' }}>
          <span style={{ fontSize: '12px', color: '#888' }}>index.js</span>
          <button onClick={runCode} disabled={running} style={{
            marginLeft: 'auto', background: '#1D9E75', color: '#fff',
            border: 'none', borderRadius: '6px', padding: '3px 14px', fontSize: '12px'
          }}>
            {running ? 'Running...' : '▶ Run'}
          </button>
        </div>
        <Editor code={code} onChange={handleCodeChange} language={language} />
        <OutputPanel output={output} loading={running} />
      </div>
    </div>
  )
}