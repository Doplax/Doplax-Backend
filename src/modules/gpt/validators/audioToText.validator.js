const { body } = require('express-validator');

const audioToTextValidator = [
  body('prompt')
    .optional()
    .isString()
    .withMessage('Prompt must be a string if provided')
];

module.exports = {
  audioToTextValidator
};