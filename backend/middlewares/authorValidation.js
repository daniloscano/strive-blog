const { body, validationResult } = require('express-validator')

const createValidationRules = [
    body('first_name')
        .notEmpty()
        .isString()
        .isLength({ max: 80 })
        .withMessage('first_name must be a not empty string, with a maximum of 80 chars'),
    body('last_name')
        .notEmpty()
        .isString()
        .isLength({ max: 80 })
        .withMessage('last_name must be a not empty string, with a maximum of 80 chars'),
    body('email')
        .notEmpty()
        .isEmail()
        .withMessage('Email must be valid and must not be empty'),
    body('date_of_birth')
        .notEmpty()
        .isString()
        .withMessage('date_of_birth must be a not empty string, in yyyy-mm-dd format'),
    body('avatar')
        .isString()
        .optional()
        .withMessage('Avatar must contain a valid URL')
]

const updateValidationRules = [
    body('first_name')
        .notEmpty()
        .isString()
        .optional()
        .isLength({ max: 80 })
        .withMessage('first_name must be a not empty string, with a maximum of 80 chars'),
    body('last_name')
        .notEmpty()
        .isString()
        .optional()
        .isLength({ max: 80 })
        .withMessage('last_name must be a not empty string, with a maximum of 80 chars'),
    body('email')
        .notEmpty()
        .isEmail()
        .optional()
        .withMessage('Email must be valid and must not be empty'),
    body('date_of_birth')
        .notEmpty()
        .isString()
        .optional()
        .withMessage('date_of_birth must be a not empty string, in yyyy-mm-dd format'),
    body('avatar')
        .isString()
        .optional()
        .withMessage('Avatar must contain a valid URL')
]

const authorValidator = (req, res, next) => {
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
    authorValidator
}