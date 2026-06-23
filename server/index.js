require('dotenv').config()
const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')
const connectDB = require('./db')
const sessionRoutes = require('./routes/session')
const registerSocketHandlers = require('./socket/index')

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})

app.use(cors())
app.use(express.json())

connectDB()

app.use('/api/session', sessionRoutes)
app.get('/', (req, res) => res.send('CodeSync backend running'))

registerSocketHandlers(io)

const PORT = process.env.PORT || 8081
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))