import { useEffect, useRef } from 'react'
import { io } from 'socket.io-client'

const SOCKET_URL = 'http://localhost:8081'

export const useSocket = () => {
  const socketRef = useRef(null)

  useEffect(() => {
    socketRef.current = io(SOCKET_URL, {
      transports: ['websocket']
    })

    return () => {
      socketRef.current.disconnect()
    }
  }, [])

  return socketRef
}