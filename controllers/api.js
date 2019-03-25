const express = require('express')
  , Router = express.Router()

Router.use('/stock', require('./stock'))

module.exports = Router
