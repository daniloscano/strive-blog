const commentService = require('../services/comment.service')
const CommentNotFound = require("../exceptions/comment/commentNotFound");

const findAll = async (req, res, next) => {
    const { postId } = req.params
    const { page = 1, pageSize = 10 } = req.query

    try {
        const filter = { post: postId }

        const comments = await commentService.findAll(page, pageSize, filter, sort)

        if (comments.data.length === 0) {
            throw new CommentNotFound()
        }

        res
            .status(200)
            .send(
                {
                    statusCode: 200,
                    comments
                }
            )
    } catch (err) {
        next(err)
    }
}

const findById = async (req, res, next) => {
    const { commentId } = req.params

    try {
        const comment = await commentService.findById(commentId)

        if (!comment) {
            throw new CommentNotFound()
        }

        res
            .status(200)
            .send(
                {
                    statusCode: 200,
                    comment
                }
            )
    } catch (err) {
        next(err)
    }
}

const create = async (req, res, next) => {
    const { postId } = req.params
    const { body } = req

    try {
        const comment = await commentService.create(postId, body)

        res
            .status(201)
            .send(
                {
                    statusCode: 201,
                    message: `Comment ${comment._id} created successfully!`,
                    comment
                }
            )
    } catch (err) {
        next(err)
    }
}

const update = async (req, res, next) => {
    const { commentId } = req.params
    const { body } = req

    try {
        const comment = await commentService.update(commentId, body)

        res
            .status(200)
            .send(
                {
                    statusCode: 200,
                    message: `Comment ${commentId} updated successfully!`,
                    comment
                }
            )
    } catch (err) {
        next(err)
    }
}

const remove = async (req, res, next) => {
    const { commentId } = req.params

    try {
        const comment = await commentService.remove(commentId)

        res
            .status(200)
            .send(
                {
                    statusCode: 200,
                    message: `Comment ${commentId} deleted successfully!`,
                    comment
                }
            )
    } catch (err) {
        next(err)
    }
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
}