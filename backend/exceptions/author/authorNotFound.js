const HTTPException = require('../index')

class AuthorNotFound extends HTTPException {
    constructor(
        message = "Authors not found!",
        statusCode = 404,
        error = "No authors found in this collection"
    ) {
        super(
            message,
            statusCode,
            error
        )
    }
}

module.exports = AuthorNotFound