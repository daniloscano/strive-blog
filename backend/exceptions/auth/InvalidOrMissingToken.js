const HTTPException = require('../index')

class InvalidOrMissingToken extends HTTPException {
    constructor(
        message = "Invalid or missing token",
        statusCode = 401,
        error = "Please provide a valid token"
    ) {
        super(
            message,
            statusCode,
            error
        );
    }
}

module.exports = InvalidOrMissingToken