const { body } = require('express-validator');

const imageVariationValidator = [
  body('baseImage')
    .isString()
    .notEmpty()
    .withMessage('Base image is required and must be a string')
];

module.exports = {
  imageVariationValidator
};