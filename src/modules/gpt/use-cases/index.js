// Export all use cases
module.exports = {
  ...require('./ortography.use-case'),
  ...require('./pros-cons-dicusser.use-case'),
  ...require('./pros-cons-stream.use-case'),
  ...require('./translate.use-case'),
  ...require('./text-to-audio.use-case'),
  ...require('./audio-to-text.use-case'),
  ...require('./image-generation.use-case'),
  ...require('./image-variation.use-case'),
};