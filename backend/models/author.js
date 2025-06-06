const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const AuthorSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
            required: true,
            max: 80
        },
        last_name: {
            type: String,
            required: true,
            max: 80
        },
        email: {
            type: String,
            required: true
        },
        password: {
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
            required: true,
            default: 'https://picsum.photos/400/250'
        },
        posts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'post'
            }
        ]
    }, { timestamp: true, strict: true }
)

AuthorSchema.pre('save', async function(next) {
    const user = this

    if (!user.isModified('password')) {
        return next()
    }

    try {
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)

        next()
    } catch (err) {
        next(err)
    }
})

module.exports = mongoose.model('author', AuthorSchema, 'authors')