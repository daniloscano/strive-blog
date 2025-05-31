const mongoose = require('mongoose')

const AuthorSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            min: 3,
            max: 80
        },
        lastName: {
            type: String,
            required: true,
            min: 3,
            max: 80
        },
        email: {
            type: String,
            required: true
        },
        dateOfBirth: {
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