const CommentSchema = require('../models/comment')
const PostSchema = require('../models/post')

const Pagination = require('../utils/pagination')
const pagination = new Pagination(CommentSchema)

const findAll = async (page, pageSize, filter, sort) => {
    const populateFields = [
        {
            path: 'author',
            select: 'first_name last_name'
        },
        {
            path: 'post',
            select: 'title'
        }
    ]

    return await pagination.getPaginatedData(page, pageSize, filter, sort, populateFields)
}

const findById = async (commentId) => {
    return CommentSchema.findById(commentId)
}

const create = async (postId, body) => {
    const newComment = new CommentSchema(body)
    const savedComment = await newComment.save()

    await PostSchema.updateOne( { _id: postId }, { $push: { comments: savedComment }})

    return savedComment
}

const update = async (commentId, body) => {
    return CommentSchema.findByIdAndUpdate(commentId, body, { new: true })
}

const remove = async (postId, commentId) => {
    const commentToDelete = await CommentSchema.findByIdAndDelete(commentId)

    await PostSchema.updateOne( { _id: postId }, { $pull: { comments: commentId } })

    return commentToDelete
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
}