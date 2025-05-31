const authorsService = require('../services/authors.service')

const getAllAuthors = async (req, res) => {
    const { page = 1, pageSize = 10 } = req.query

    try {
        const authors = await authorsService.getAuthors(page, pageSize)

        if (authors.data.length === 0) {
            res
                .status(404)
                .send(
                    {
                        statusCode: 404,
                        message: 'No author found'
                    }
                )
        }

        res
            .status(200)
            .send(
                {
                    statusCode: 200,
                    authors
                }
            )
    } catch (e) {
        res
            .status(500)
            .send(
                {
                    statusCode: 500,
                    message: 'Internal server error'
                }
            )
    }
}

const getAuthorById = async (req, res) => {
    const { authorId } = req.params

    try {
        const author = await authorsService.getAuthorById(authorId)

        if (!author) {
            res
                .status(404)
                .send(
                    {
                        statusCode: 404,
                        message: 'No author found'
                    }
                )
        }
    } catch (e) {
        res
            .status(500)
            .send(
                {
                    statusCode: 500,
                    message: 'Internal server error'
                }
            )
    }
}

const postNewAuthor = async (req, res) => {
    const { body } = req

    try {
        const author = await authorsService.createAuthor(body)

        res
            .status(201)
            .send(
                {
                    statusCode: 201,
                    message: "New author created",
                    author
                }
            )
    } catch (e) {
        res
            .status(500)
            .send(
                {
                    statusCode: 500,
                    message: 'Internal server error'
                }
            )
    }
}

module.exports = {
    getAllAuthors,
    getAuthorById,
    postNewAuthor
}