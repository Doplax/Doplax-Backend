const { body } = require('express-validator');

const orthographyValidator = [
  body('prompt')
    .isString()
    .notEmpty()
    .withMessage('Prompt is required and must be a string'),
  body('maxTokens')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Max tokens must be a positive integer')
];

module.exports = {
  orthographyValidator
};