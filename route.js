const exprees = require('express')
const router = exprees.Router()
const Url = require('./models/url')

router.get('/', (req, res) => {
  res.render('index')
})

router.get('/shorten', (req, res) => {
  const shortenUrl = sample()
  Url.findOne({ shortenUrl }).then(url => {
    if (url) {
      res.redirect('/shorten')
    } else {
      const baseUrl = process.env.shortenurl_generator_URL || 'http:localhost:3000/'
      const newUrl = baseUrl + shortenUrl
      Url.create({
        originUrl: req.query.url,
        shortenUrl,
        newUrl
      }).then(() => {
        res.render('new', { newUrl, originUrl: req.query.url })
      })
    }
  })
})

router.get('/:shortenUrl', (req, res) => {
  const shortenUrl = req.params.shortenUrl
  Url.findOne({ shortenUrl }).then(url => {
    res.redirect(`${url.originUrl}`)
  })
})

module.exports = router

function sample() {
  const char = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
  let url = ''
  for (let i = 0; i < 5; i++) {
    const randomPick = Math.floor(Math.random() * char.length)
    url += char[randomPick]
  }
  return url
}
