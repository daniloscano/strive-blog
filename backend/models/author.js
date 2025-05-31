const mongoose = require('mongoose')

const AuthorSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
            required: true,
            min: 3,
            max: 80
        },
        last_name: {
            type: String,
            required: true,
            min: 3,
            max: 80
        },
        email: {
            type: String,
            required: true
        },
        date_of_birth: {
            type: String,
            required: true,
            max: 10
        },
        avatar: {
            type: String,
            required: false
        }
    }, { timestamps: true, strict: true }
)

module.exports = mongoose.model('author', AuthorSchema, 'authors')