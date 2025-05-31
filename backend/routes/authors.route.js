const express = require('express')
const authorsController = require('../controllers/authors.controller')

const authors = express.Router()

authors.get("/", authorsController.getAllAuthors)
authors.get("/:authorId", authorsController.getAuthorById)
authors.post("/create", authorsController.postNewAuthor)

module.exports = authors