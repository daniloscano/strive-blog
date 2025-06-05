const mongoose = require('mongoose')
const HTTPException = require('../exceptions/index')

const errorHandler = (err, req, res, next) => {
    if (err instanceof HTTPException) {
        return res
            .status(err.statusCode)
            .send(
                {
                    statusCode: err.statusCode,
                    message: err.message,
                    error: err.error
                }
            )
    }


    console.error(err)
    res
        .status(500)
        .send(
            {
                statusCode: 500,
                message: 'Internal server error!',
                error: 'An error has occurred, please try again later or contact administrator'
            }
        )
}

module.exports = errorHandler