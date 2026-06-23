const mongoose = require('mongoose')

const SessionSchema = new mongoose.Schema({
  roomId: {
    type: String,
    required: true,
    unique: true
  },
  code: {
    type: String,
    default: '// Start coding here...'
  },
  language: {
    type: String,
    default: 'javascript'
  },
  participants: [String]
}, { timestamps: true })

module.exports = mongoose.model('Session', SessionSchema)