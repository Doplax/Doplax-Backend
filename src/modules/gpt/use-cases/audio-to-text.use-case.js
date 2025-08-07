const OpenAI = require('openai');
const fs = require('fs');

const audioToTextUsecase = async (openai, options) => {
  const { prompt, audioFile } = options;
  console.log({ prompt, audioFile });

  const response = await openai.audio.transcriptions.create({
    model: 'whisper-1',
    file: fs.createReadStream(audioFile.path),
    prompt: prompt,
    language: 'es',
    response_format: 'verbose_json',
  });

  console.log(response);
  return response;
};

module.exports = {
  audioToTextUsecase
};