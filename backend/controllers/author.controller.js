const authorService = require('../services/author.service')
const AuthorNotFound = require('../exceptions/author/authorNotFound')

const findAll = async (req, res, next) => {
    const { page = 1, pageSize = 10 } = req.query

    try {
        const authors = await authorService.findAll(page, pageSize)

        if (authors.data.length === 0) {
            throw new AuthorNotFound()
        }

        res
            .status(200)
            .send(
                {
                    statusCode: 200,
                    authors
                }
            )
    } catch (err) {
        next(err)
    }
}

const findById = async (req, res, next) => {
    const { authorId } = req.params

    try {
        const author = await authorService.findById(authorId)

        if (!author) {
            throw new AuthorNotFound()
        }

        res
            .status(200)
            .send(
                {
                    statusCode: 200,
                    author
                }
            )
    } catch (err) {
        next(err)
    }
}

const create = async (req, res, next) => {
    const { body, file } = req

    try {
        if (file && file.path) {
            body.avatar = file.path
        }

        const author = await authorService.create(body)

        res
            .status(201)
            .send(
                {
                    statusCode: 201,
                    message: `Author ${author._id} created successfully!`,
                    author
                }
            )
    } catch (err) {
        next(err)
    }
}

const update = async (req, res, next) => {
    const { authorId } = req.params
    const { body, file } = req

    try {
        if (file && file.path) {
            body.avatar = file.path
        }

        const author = await authorService.update(authorId, body)

        res
            .status(200)
            .send(
                {
                    statusCode: 200,
                    message: `Author ${authorId} updated successfully!`,
                    author
                }
            )
    } catch (err) {
        next(err)
    }
}

const remove = async (req, res, next) => {
    const { authorId } = req.params

    try {
        const author = await authorService.remove(authorId)

        res
            .status(200)
            .send(
                {
                    statusCode: 200,
                    message: `Author ${authorId} deleted successfully!`,
                    author
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