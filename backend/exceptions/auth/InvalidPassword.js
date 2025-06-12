const HTTPException = require('../index')

class InvalidPassword extends HTTPException {
    constructor(
        message = "Invalid email or password provided",
        statusCode = 403,
        error = "Please provide valid credentials to access this resource"
    ) {
        super(
            message,
            statusCode,
            error
        );
    }
}

module.exports = InvalidPassword