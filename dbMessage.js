import mongoose from 'mongoose'

const tikTalkSchema = mongoose.Schema({
  message: String,
  name: String,
  timestamp: String
})

export default mongoose.model('messageContent', tikTalkSchema)
