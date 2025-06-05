const AuthorSchema = require('../models/author')

const Pagination = require('../utils/pagination')
const pagination = new Pagination(AuthorSchema)

const findAll = async (page, pageSize, filter, sort) => {
    return await pagination.getPaginatedData(page, pageSize, filter, sort)
}

const findById = async (authorId) => {
    return AuthorSchema.findById(authorId)
}

const create = async (body) => {
    const newAuthor = new AuthorSchema(body)
    return await newAuthor.save()
}

const update = async (authorId, body) => {
    return AuthorSchema.findByIdAndUpdate(authorId, body, { new: true })
}

const remove = async (authorId) => {
    return AuthorSchema.findByIdAndDelete(authorId)
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
}