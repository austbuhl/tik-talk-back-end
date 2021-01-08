import mongoose from 'mongoose'

const messageSchema = mongoose.Schema({
  message: String,
  name: String,
  timestamp: String,
  sent: Boolean,
  room: {
    roomId: { type: mongoose.Schema.Types.ObjectId, required: true },
    name: String
  }
})

//collection
export default mongoose.model('Message', messageSchema)
