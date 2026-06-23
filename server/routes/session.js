const express = require('express')
const router = express.Router()
const Session = require('../models/session')
const { v4: uuidv4 } = require('uuid')

router.post('/create', async (req, res) => {
  try {
    const roomId = uuidv4().slice(0, 8)
    const session = await Session.create({ roomId })
    res.json({ roomId: session.roomId })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get('/:roomId', async (req, res) => {
  try {
    const session = await Session.findOne({ roomId: req.params.roomId })
    if (!session) return res.status(404).json({ error: 'Session not found' })
    res.json(session)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router