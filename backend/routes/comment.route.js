const express = require('express')
const commentController = require('../controllers/comment.controller')
const { createValidationRules, updateValidationRules, commentValidator } = require('../middlewares/commentValidation')

const comments = express.Router()

comments.get("/:postId/comments", commentController.findAll)
comments.get("/:postId/comments/:commentId", commentController.findById)
comments.post("/:postId/comments/create", [ createValidationRules, commentValidator ], commentController.create)
comments.patch("/:postId/comments/:commentId/edit", [ updateValidationRules, commentValidator ], commentController.update)
comments.delete("/:postId/comments/:commentId/delete", commentController.remove)

module.exports = comments