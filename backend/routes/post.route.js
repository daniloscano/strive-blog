const express = require('express')
const postController = require('../controllers/post.controller')
const { createValidationRules, updateValidationRules, postValidator } = require('../middlewares/postValidation')

const posts = express.Router()

posts.get("/", postController.findAll)
posts.get("/:postId", postController.findById)
posts.post('/create', [ createValidationRules, postValidator ], postController.create)
posts.patch("/:postId/edit", [ updateValidationRules, postValidator ], postController.update)
posts.delete("/:postId/delete", postController.remove)


module.exports = posts
