const { body } = require('express-validator');

const imageGenerationValidator = [
  body('prompt')
    .isString()
    .notEmpty()
    .withMessage('Prompt is required and must be a string'),
  body('originalImage')
    .optional()
    .isString()
    .withMessage('Original image must be a string if provided'),
  body('maskImage')
    .optional()
    .isString()
    .withMessage('Mask image must be a string if provided')
];

module.exports = {
  imageGenerationValidator
};