const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema(
    {
        comment: {
            type: String,
            required: true,
            min: 3
        },
        rating: {
            type: Number,
            required: true,
            default: 1,
            enum: [ 1, 2, 3, 4, 5 ]
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'author'
        },
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'post'
        }
    }, { timestamp: true, strict: true }
)

module.exports = mongoose.model('comment', CommentSchema, 'comments')