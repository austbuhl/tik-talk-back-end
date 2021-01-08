import mongoose from 'mongoose'

const roomSchema = mongoose.Schema({
  name: String
})

//collection
export default mongoose.model('Room', roomSchema)
