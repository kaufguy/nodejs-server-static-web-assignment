const express = require('express')
  , Router = express.Router()

Router.use('/api', require('./api'))

Router.get('/', (req, res) => {
  res.sendFile('public/index.html')
})

module.exports = Router
