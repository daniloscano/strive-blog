const { body, validationResult } = require('express-validator')

const createValidationRules = [
    body('comment')
        .notEmpty()
        .isString()
        .isLength( { min: 3})
        .withMessage('comment must be a not empty string, with a minimum of 3 chars'),
    body('rating')
        .notEmpty()
        .isInt()
        .optional()
        .withMessage('rating must be an integer between 1 and 5'),
    body('author')
        .isMongoId()
        .withMessage('author must be an existing author id'),
    body('post')
        .isMongoId()
        .withMessage('post must be an existing post id')
]

const updateValidationRules = [
    body('comment')
        .notEmpty()
        .isString()
        .optional()
        .isLength( { min: 3})
        .withMessage('comment must be a not empty string, with a minimum of 3 chars'),
    body('rating')
        .notEmpty()
        .isInt()
        .optional()
        .withMessage('rating must be an integer between 1 and 5'),
    body('author')
        .isMongoId()
        .optional()
        .withMessage('author must be an existing author id'),
    body('post')
        .isMongoId()
        .optional()
        .withMessage('post must be an existing post id')
]

const commentValidator = (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res
            .status(400)
            .send(
                {
                    ...errors
                }
            )
    }

    next()
}

module.exports = {
    createValidationRules,
    updateValidationRules,
    commentValidator
}