const jwt = require('jsonwebtoken')

const googleLogin = (req, res, next) => {
    try {
        const { user } = req
        const token = jwt.sign(user, process.env.JWT_SECRET)


        console.log(user)
        const redirectUrl = `${process.env.CLIENT_BASE_URL}/success?token=${encodeURIComponent(JSON.stringify(token))}`

        res
            .redirect(redirectUrl)
    } catch (err) {
        next(err)
    }
}

module.exports = {
    googleLogin
}