const express = require('express')
const authorsController = require('../controllers/authors.controller')

const authors = express.Router()

authors.get("/", authorsController.getAllAuthors)

module.exports = authors