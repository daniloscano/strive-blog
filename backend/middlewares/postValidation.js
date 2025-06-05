const { body, validationResult } = require('express-validator')

const createValidationRules = [
    body('category')
        .notEmpty()
        .isString()
        .isLength({ min: 3 })
        .withMessage('category must be a not empty string, with a minimum of 3 chars'),
    body('title')
        .notEmpty()
        .isString()
        .isLength({ max: 80 })
        .withMessage('title must be a not empty string, with a maximum of 80 chars'),
    body('cover')
        .isString()
        .optional()
        .withMessage('cover must contain a valid URL'),
    body('readTime.value')
        .isInt()
        .optional()
        .withMessage('readTime value must be an integer'),
    body('readTime.unit')
        .isString()
        .optional()
        .withMessage('readTime unit must be a not empty string'),
    body('author')
        .isMongoId()
        .withMessage('author must be an existing author id'),
    body('content')
        .notEmpty()
        .isString()
        .withMessage('content is required and must be a string')
]

const updateValidationRules = [
    body('category')
        .notEmpty()
        .isString()
        .optional()
        .isLength({ min: 3 })
        .withMessage('category must be a not empty string, with a minimum of 3 chars'),
    body('title')
        .notEmpty()
        .isString()
        .optional()
        .isLength({ max: 80 })
        .withMessage('title must be a not empty string, with a maximum of 80 chars'),
    body('cover')
        .isString()
        .optional()
        .withMessage('cover must contain a valid URL'),
    body('readTime.value')
        .isInt()
        .optional()
        .withMessage('readTime value must be an integer'),
    body('readTime.unit')
        .isString()
        .optional()
        .withMessage('readTime unit must be a not empty string'),
    body('author')
        .isMongoId()
        .optional()
        .withMessage('author must be an existing author id'),
    body('content')
        .notEmpty()
        .isString()
        .optional()
        .withMessage('content is required and must be a string')
]

const postValidator = (req, res, next) => {
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
    postValidator
}