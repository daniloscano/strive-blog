const express = require('express')
const authorController = require('../controllers/author.controller')

const authors = express.Router()

authors.get("/", authorController.findAll)

module.exports = authors
