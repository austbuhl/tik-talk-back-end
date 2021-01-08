import express from 'express'
import Messages from '../models/message.js'

const router = express.Router()

router.get('/', (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(200).json(data)
    }
  })
})

router.post('/', (req, res) => {
  const message = req.body
  Messages.create(message, (err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(201).json(data)
    }
  })
})

export default router
