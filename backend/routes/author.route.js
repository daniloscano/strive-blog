const express = require('express')
const authorController = require('../controllers/author.controller')
const postController = require('../controllers/post.controller')
const { createValidationRules, authorValidator, updateValidationRules} = require('../middlewares/authorValidation')

const authors = express.Router()

authors.get("/", authorController.findAll)
authors.get("/:authorId/posts", postController.findAll)
authors.get("/:authorId", authorController.findById)
authors.post("/create", [ createValidationRules, authorValidator ], authorController.create)
authors.patch("/:authorId/edit", [ updateValidationRules, authorValidator ], authorController.update)
authors.delete("/:authorId/delete", authorController.remove)

module.exports = authors
