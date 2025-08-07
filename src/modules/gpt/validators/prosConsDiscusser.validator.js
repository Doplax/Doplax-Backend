const { body } = require('express-validator');

const prosConsDiscusserValidator = [
  body('prompt')
    .isString()
    .notEmpty()
    .withMessage('Prompt is required and must be a string')
];

module.exports = {
  prosConsDiscusserValidator
};