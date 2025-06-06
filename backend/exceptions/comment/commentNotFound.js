const HTTPException = require('../index')

class CommentNotFound extends HTTPException {
    constructor(
        message = "Comments not found!",
        statusCode = 404,
        error = "No comments found for this post"
    ) {
        super(
            message,
            statusCode,
            error
        );
    }
}

module.exports = CommentNotFound