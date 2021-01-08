import mongoose from 'mongoose'

const messageSchema = mongoose.Schema({
  message: String,
  name: String,
  timestamp: String,
  sent: Boolean,
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true
  }
})

//collection
export default mongoose.model('Message', messageSchema)
