// Export all validators
module.exports = {
  ...require('./orthography.validator'),
  ...require('./prosConsDiscusser.validator'),
  ...require('./translate.validator'),
  ...require('./textToAudio.validator'),
  ...require('./audioToText.validator'),
  ...require('./imageGeneration.validator'),
  ...require('./imageVariation.validator'),
};