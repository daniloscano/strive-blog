const AuthorSchema = require('../models/author')
const Pagination = require('../utils/pagination')

const pagination = new Pagination(AuthorSchema)

const getAuthors = async (page, pageSize, filter, sort) => {
    return await pagination.getPaginatedData(page, pageSize, filter, sort)
}

const getAuthorById = async (id) => {
    return AuthorSchema.findById(id)
}

const createAuthor = async (body) => {
    const newAuthor = new AuthorSchema(body)

    return await newAuthor.save()
}

module.exports = {
    getAuthors,
    getAuthorById,
    createAuthor
}