const mongoose = require('mongoose')
const Schema = mongoose.Schema

const urlSchema = new Schema({
  originUrl: {
    type: String,
    required: true
  },
  shortenUrl: {
    type: String,
    required: true
  },
  newUrl: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Url', urlSchema)
