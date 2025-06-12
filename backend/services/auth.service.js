const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const AuthorSchema = require('../models/author')
const AuthorNotFound = require('../exceptions/author/authorNotFound')
const InvalidPassword = require('../exceptions/auth/InvalidPassword')

const findAuthor = (authorId) => {
    return AuthorSchema.findById(authorId)
}

const login = async (email, password) => {
    const author = await AuthorSchema.findOne( { email: email})

    if (!author) {
        throw new AuthorNotFound()
    }

    const isPasswordValid = await bcrypt.compare(password, author.password)

    if (!isPasswordValid) {
        throw new InvalidPassword()
    }

    const token = jwt.sign(
        {
            id: author._id,
            email: author.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '12h'
        }
    )

    return {
        token
    }
}

module.exports = {
    findAuthor,
    login
}