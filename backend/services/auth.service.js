const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const AuthorSchema = require('../models/author')
const AuthorNotFound = require('../exceptions/author/authorNotFound')
const InvalidPassword = require('../exceptions/auth/InvalidPassword')

const login = async (email, password) => {
    const author = await AuthorSchema.findOne( { email: email})

    if (!user) {
        throw new AuthorNotFound()
    }

    const isPasswordValid = await bcrypt.compare(password, author.password)

    if (!isPasswordValid) {
        throw new InvalidPassword()
    }

    const token = jwt.sign(
        {
        email: user.email
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
    login
}