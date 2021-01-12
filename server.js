// imports
import express from 'express'
import mongoose from 'mongoose'
import messagesRoutes from './routes/messages.js'
import roomsRoutes from './routes/rooms.js'
import Pusher from 'pusher'
import cors from 'cors'

// app config
const app = express()
const port = process.env.PORT || 9000
const pusher = new Pusher({
  appId: '1121422',
  key: '1e8a1765529bbbac589e',
  secret: '95133b8c0ece2495fff2',
  cluster: 'us2',
  useTLS: true
})

// middleware
app.use(express.json())
app.use(cors())

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*')
//   res.setHeader('Access-Control-Allow-Headers', '*')
//   next()
// })

// DB config
const connectionUrl =
  'mongodb+srv://admin:W8hbrGE1jqHO1Bm2@cluster0.h00ty.mongodb.net/tiktalkdb?retryWrites=true&w=majority'

mongoose.connect(connectionUrl, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection

db.once('open', () => {
  console.log('DB Connected')

  const msgCollection = db.collection('messages')
  const msgChangeStream = msgCollection.watch()

  const roomCollection = db.collection('rooms')
  const roomChangeStream = roomCollection.watch()

  msgChangeStream.on('change', (change) => {
    console.log(change)
    if (change.operationType === 'insert') {
      const messageDetails = change.fullDocument
      pusher.trigger('messages', 'inserted', {
        ...messageDetails
      })
    } else {
      console.log('error triggering pusher')
    }
  })

  roomChangeStream.on('change', (change) => {
    console.log(change)
    if (change.operationType === 'insert') {
      const roomDetails = change.fullDocument
      pusher.trigger('rooms', 'inserted', {
        ...roomDetails
      })
    } else {
      console.log('error triggering pusher')
    }
  })
})

// api routes
app.get('/', (req, res) => res.status(200).send('hello world'))

app.use('/api/v1/messages', messagesRoutes)
app.use('/api/v1/rooms', roomsRoutes)

// listen
app.listen(port, () => console.log(`Listening on localhost:${port}`))
