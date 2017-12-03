const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const config = require('./config')
const port = process.env.PORT || 8080 

const app = express()

app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/uploads', express.static('uploads'));

// app.use('/users', users);
app.use('/api', require('./routes/api'))
app.listen(port, () => {
  console.log(`Express is running on port ${port}`)
})

const db = mongoose.connect(config.mongodbUri, {
  useMongoClient: true,
  socketTimeoutMS: 0,
  keepAlive: true,
  reconnectTries: 30
})
db.on('error', console.error)
db.once('open', () => {
    console.log('connected to mongodb server')
})