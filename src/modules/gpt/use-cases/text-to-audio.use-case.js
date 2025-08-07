const OpenAI = require('openai');
const path = require('path');
const fs = require('fs');

const textToAudioUseCase = async (openai, options) => {
  const voices = {
    nova: 'nova',
    alloy: 'alloy',
    ash: 'ash',
    coral: 'coral',
    echo: 'echo',
    fable: 'fable',
    onyx: 'onyx',
    sage: 'sage',
    shimmer: 'shimmer',
  };

  const selectedVoice = voices[options.voice] ?? 'nova'; // En el caso de no ser uno de los dos, se selecciona nova por defecto

  const folderPath = path.resolve(__dirname, `../../../../generated/audios`);
  const speechFile = path.resolve(`${folderPath}/${new Date().getTime()}.mp3`);

  fs.mkdirSync(folderPath, { recursive: true }); // Crea la carpeta si no existe

  const mp3 = await openai.audio.speech.create({
    model: 'tts-1',
    voice: selectedVoice,
    input: options.prompt,
    response_format: 'mp3'
  });

  const buffer = Buffer.from(await mp3.arrayBuffer());
  fs.writeFileSync(speechFile, buffer);

  return speechFile;
};

module.exports = {
  textToAudioUseCase
};