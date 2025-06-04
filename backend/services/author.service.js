const AuthorSchema = require('../models/author')

const Pagination = require('../utils/pagination')
const pagination = new Pagination(AuthorSchema)

const findAll = async (page, pageSize, filter, sort) => {
    return await pagination.getPaginatedData(page, pageSize, filter, sort)
}

module.exports = {
    findAll
}