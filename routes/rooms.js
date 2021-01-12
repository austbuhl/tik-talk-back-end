import express from 'express'
import Messages from '../models/message.js'
import Rooms from '../models/room.js'

const router = express.Router()

router.get('/', (req, res) => {
  Rooms.find((err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(200).json(data)
    }
  })
})

router.post('/', (req, res) => {
  const room = req.body
  Rooms.create(room, (err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(201).json(data)
    }
  })
})

router.get('/:roomId/messages', (req, res) => {
  const roomId = req.params.roomId
  Messages.find({ roomId: roomId })
    // .populate('roomId')
    .then((err, data) => {
      if (err) {
        res.status(500).send(err)
      } else {
        res.status(200).json(data)
      }
    })
})

export default router
