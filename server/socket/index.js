const Session = require('../models/session')
const { applyOp, transform } = require('./ot')

const rooms = {}

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('Socket connected:', socket.id)

    socket.on('join-room', async ({ roomId, username }) => {
      socket.join(roomId)
      socket.data.roomId = roomId
      socket.data.username = username

      if (!rooms[roomId]) rooms[roomId] = { code: '', history: [] }

      try {
        const session = await Session.findOne({ roomId })
        if (session) rooms[roomId].code = session.code
      } catch (e) {}

      socket.emit('init', { code: rooms[roomId].code })
      socket.to(roomId).emit('user-joined', { username, socketId: socket.id })
      console.log(`${username} joined room ${roomId}`)
    })

    socket.on('code-change', ({ roomId, code }) => {
      if (!rooms[roomId]) rooms[roomId] = { code, history: [] }
      rooms[roomId].code = code
      socket.to(roomId).emit('code-update', code)
    })

    socket.on('cursor-move', ({ roomId, position, username }) => {
      socket.to(roomId).emit('cursor-update', {
        socketId: socket.id,
        username,
        position
      })
    })

    socket.on('disconnect', async () => {
      const { roomId } = socket.data
      if (roomId && rooms[roomId]) {
        try {
          await Session.findOneAndUpdate(
            { roomId },
            { code: rooms[roomId].code },
            { new: true }
          )
          console.log(`Saved room ${roomId} to DB`)
        } catch (e) {
          console.error('Save error:', e.message)
        }
      }
      if (roomId) socket.to(roomId).emit('user-left', { socketId: socket.id })
    })
  })
}