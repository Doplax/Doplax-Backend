const { body } = require('express-validator');

const translateValidator = [
  body('prompt')
    .isString()
    .notEmpty()
    .withMessage('Prompt is required and must be a string'),
  body('lang')
    .isString()
    .notEmpty()
    .withMessage('Language is required and must be a string')
];

module.exports = {
  translateValidator
};