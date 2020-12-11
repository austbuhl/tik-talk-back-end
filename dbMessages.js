import mongoose from 'mongoose'

const tikTalkSchema = mongoose.Schema({
  message: String,
  name: String,
  timestamp: String,
  sent: Boolean
})

//collection
export default mongoose.model('messages', tikTalkSchema)
