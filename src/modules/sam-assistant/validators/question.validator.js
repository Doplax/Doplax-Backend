const { body } = require('express-validator');

const questionValidator = [
  body('threadId')
    .isString()
    .notEmpty()
    .withMessage('Thread ID is required and must be a string'),
  body('question')
    .isString()
    .notEmpty()
    .withMessage('Question is required and must be a string')
];

module.exports = {
  questionValidator
};