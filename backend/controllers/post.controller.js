const postService = require('../services/post.service')
const PostNotFound = require('../exceptions/post/postNotFound')

const findAll = async (req, res, next) => {
    const { authorId } = req.params
    const { page = 1, pageSize = 10, title } = req.query

    try {
        let filter = {}

        if (authorId) {
            filter = { author: authorId }
        }

        if (title) {
            filter.title = { $regex: title, $options: 'i' }
        }

        const posts = await postService.findAll(page, pageSize, filter)

        if (posts.data.length === 0) {
            throw new PostNotFound()
        }

        res
            .status(200)
            .send(
                {
                    statusCode: 200,
                    posts
                }
            )
    } catch (err) {
        next(err)
    }
}

const findById = async (req, res, next) => {
    const { postId } = req.params

    try {
        const post = await postService.findById(postId)

        if (!post) {
            throw new PostNotFound()
        }

        res
            .status(200)
            .send(
                {
                    statusCode: 200,
                    post
                }
            )
    } catch (err) {
        next(err)
    }
}

const create = async (req, res, next) => {
    const { body } = req

    try {
        const post = await postService.create(body)

        res
            .status(201)
            .send(
                {
                    statusCode: 201,
                    message: `Post ${post._id} created successfully!`,
                    post
                }
            )
    } catch (err) {
        next(err)
    }
}

const update = async (req, res, next) => {
    const { postId } = req.params
    const { body } = req

    try {
        const post = await postService.update(postId, body)

        res
            .status(200)
            .send(
                {
                    statusCode: 200,
                    message: `Post ${postId} updated successfully!`,
                    post
                }
            )
    } catch (err) {
        next(err)
    }
}

const remove = async (req, res, next) => {
    const { postId } = req.params

    try {
        const post = await postService.remove(postId)

        res
            .status(200)
            .send(
                {
                    statusCode: 200,
                    message: `Post ${postId} deleted successfully!`,
                    post
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