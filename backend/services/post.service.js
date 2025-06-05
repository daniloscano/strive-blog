const PostSchema = require('../models/post')
const AuthorSchema = require('../models/author')

const Pagination = require('../utils/pagination')
const mongoose = require("mongoose");
const pagination = new Pagination(PostSchema)

const findAll = async (page, pageSize, filter, sort) => {
    const populateFields = [
        {
            path: 'author',
            select: 'first_name last_name'
        }
    ]

    return await pagination.getPaginatedData(page, pageSize, filter, sort, populateFields)
}

const findById = async (postId) => {
    return PostSchema.findById(postId)
}

const create = async (body) => {
    const newPost = new PostSchema(body)
    const savedPost = await newPost.save()

    await AuthorSchema.updateOne({ _id: body.author }, { $push: { posts: savedPost }})

    return savedPost
}

const update = async (postId, body) => {
    return PostSchema.findByIdAndUpdate(postId, body, { new: true })
}

const remove = async (postId) => {
    const postToDelete = await PostSchema.findByIdAndDelete(postId)

    await AuthorSchema.updateOne({ _id: postToDelete.author._id }, { $pull: { posts: postToDelete._id } })

    return postToDelete
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
}
