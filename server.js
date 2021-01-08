// imports
import express from 'express'
import mongoose from 'mongoose'
import Messages from './models/message.js'
import Rooms from './models/room.js'
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
  const changeStream = msgCollection.watch()

  changeStream.on('change', (change) => {
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
})

// api routes
app.get('/', (req, res) => res.status(200).send('hello world'))

app.get('/api/v1/messages', (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(200).send(data)
    }
  })
})

app.post('/api/v1/messages/', (req, res) => {
  const message = req.body
  Messages.create(message, (err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(201).send(data)
    }
  })
})

app.get('/api/v1/rooms', (req, res) => {
  Rooms.find((err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(200).send(data)
    }
  })
})

app.post('/api/v1/rooms', (req, res) => {
  const room = req.body
  Rooms.create(room, (err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(200).send(data)
    }
  })
})

// listen
app.listen(port, () => console.log(`Listening on localhost:${port}`))
