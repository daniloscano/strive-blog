const HTTPException = require('../index')

class PostNotFound extends HTTPException {
    constructor(
        message = "Posts not found!",
        statusCode = 404,
        error = "No posts found in this collection"
    ) {
        super(
            message,
            statusCode,
            error
        );
    }
}

module.exports = PostNotFound