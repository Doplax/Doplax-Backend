const { body } = require('express-validator');

const textToAudioValidator = [
  body('prompt')
    .isString()
    .notEmpty()
    .withMessage('Prompt is required and must be a string'),
  body('voice')
    .optional()
    .isString()
    .withMessage('Voice must be a string')
];

module.exports = {
  textToAudioValidator
};