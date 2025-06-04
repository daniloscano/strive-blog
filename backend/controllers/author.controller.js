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
        next()
    }
}

module.exports = {
    findAll
}