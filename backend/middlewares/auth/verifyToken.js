const jwt = require('jsonwebtoken')
const InvalidOrMissingToken = require('../../exceptions/auth/InvalidOrMissingToken')

const verifyToken = async (req, res, next) => {
    if (req.path === '/auth/login') return next()

    const token = req.header('authorization')

    if (!token) {
        throw new InvalidOrMissingToken()
    }

    try {
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verifiedToken

        next()
    } catch (err) {
        throw new InvalidOrMissingToken()
    }
}

module.exports = verifyToken