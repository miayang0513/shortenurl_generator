const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const app = express()
const port = 3000

app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'pug')

const db = mongoose.connection
mongoose.set('debug', true)
mongoose.connect('mongodb://localhost/shortUrl', {
  useNewUrlParser: true,
  useCreateIndex: true
})

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.use('/', require('./route'))

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})

