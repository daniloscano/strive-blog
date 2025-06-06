const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema(
    {
        category: {
            type: String,
            required: true,
            min: 3
        },
        title: {
            type: String,
            required: true,
            max: 80
        },
        cover: {
            type: String,
            required: true,
            default: 'https://picsum.photos/400/250'
        },
        readTime: {
            value: {
                type: Number,
                required: false,
                default: 60
            },
            unit: {
                type: String,
                required: false,
                default: 'seconds',
                enum: ['seconds', 'minutes']
            }
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'author'
        },
        content: {
            type: String,
            required: true
        },
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'comment'
            }
        ]
    }, { timestamp: true, strict: true }
)

module.exports = mongoose.model('post', PostSchema, 'posts')