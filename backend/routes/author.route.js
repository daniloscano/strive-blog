const express = require('express')
const authorController = require('../controllers/author.controller')
const postController = require('../controllers/post.controller')
const { createValidationRules, authorValidator, updateValidationRules} = require('../middlewares/authorValidation')
const { cloudUpload } = require('../middlewares/multer/index')

const authors = express.Router()

authors.get("/", authorController.findAll)
authors.get("/:authorId/posts", postController.findAll)
authors.get("/:authorId", authorController.findById)
authors.post("/create", [ cloudUpload('authors/avatar', 'avatar').single('avatar'), createValidationRules, authorValidator ], authorController.create)
authors.patch("/:authorId/edit", [ cloudUpload('authors/avatar', 'avatar').single('avatar'), updateValidationRules, authorValidator ], authorController.update)
authors.delete("/:authorId/delete", authorController.remove)

module.exports = authors
