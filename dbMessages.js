import mongoose from 'mongoose'

const tikTalkSchema = mongoose.Schema({
  message: String,
  name: String,
  timestamp: String,
  sent: Boolean
})

export default mongoose.model('messageContent', tikTalkSchema)
