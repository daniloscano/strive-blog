const AuthorSchema = require('../models/author')
const Pagination = require('../utils/pagination')

const pagination = new Pagination(AuthorSchema)

const getAuthors = async (page, pageSize, filter, sort) => {
    return await pagination.getPaginatedData(page, pageSize, filter, sort)
}

const getAuthorById = async (id) => {
    return AuthorSchema.findById(id)
}

module.exports = {
    getAuthors,
    getAuthorById
}