const authService = require('../services/auth.service')

const login = async (req, res, next) => {
    const { email, password } = req.body
    try {
        const { token } = await authService.login(email, password)

        res
            .header('authorization', token)
            .status(200)
            .send(
                {
                    statusCode: 200,
                    message: 'Login successfully!',
                    token
                }
            )
    } catch (err) {
        next(err)
    }
}

module.exports = {
    login
}