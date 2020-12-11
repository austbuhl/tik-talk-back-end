// imports
import express from 'express'
import mongoose from 'mongoose'

// app config
const app = express()
const port = process.env.PORT || 9000

// middleware

// DB config
const connectionUrl =
  'mongodb+srv://admin:W8hbrGE1jqHO1Bm2@cluster0.h00ty.mongodb.net/tiktalkdb?retryWrites=true&w=majority'

mongoose.connect(connectionUrl, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// ????

// api routes
app.get('/', (req, res) => res.status(200).send('hello world'))

// listen
app.listen(port, () => console.log(`Listening on localhost:${port}`))
