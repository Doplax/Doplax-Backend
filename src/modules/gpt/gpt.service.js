const OpenAI = require('openai');
const path = require('path');
const fs = require('fs');

const {
  orthographyCheckUseCase,
  prosConsDicusserUseCase,
  prosConsDicusserStreamUseCase,
  translateUseCase,
  textToAudioUseCase,
  audioToTextUsecase,
  imageGenerationUseCase,
  imageVariationUseCase
} = require('./use-cases');

class GptService {
  constructor() {
    this.openai = new OpenAI({ apiKey: process.env.OPEN_API_KEY });
  }

  // Solo va a llamar casos de uso
  async orthographyCheck({ prompt }) {
    return await orthographyCheckUseCase(this.openai, { prompt });
  }

  async prosConsDicusser({ prompt }) {
    return await prosConsDicusserUseCase(this.openai, { prompt });
  }

  async prosConsDicusserStream({ prompt }) {
    return await prosConsDicusserStreamUseCase(this.openai, { prompt });
  }

  async translateText({ prompt, lang }) {
    return await translateUseCase(this.openai, { prompt, lang });
  }

  async textToAudio({ prompt, voice }) {
    return await textToAudioUseCase(this.openai, { prompt, voice });
  }

  async textToAudioGetter(fileId) {
    const filePath = path.resolve(
      __dirname,
      `../../../generated/audios/${fileId}.mp3`,
    );
    const wasFileFound = fs.existsSync(filePath);

    if (!wasFileFound) {
      throw new Error(`File ${fileId} not found`);
    }

    return filePath;
  }

  async audioToText(audioFile, audioToText) {
    const { prompt } = audioToText || {};
    return await audioToTextUsecase(this.openai, { audioFile, prompt });
  }

  async imageGeneration(imageGeneration) {
    return await imageGenerationUseCase(this.openai, { ...imageGeneration });
  }

  async getGeneratedImage(fileName) {
    const filePath = path.resolve('./', './generated/images/', fileName);
    const exist = fs.existsSync(filePath);

    if (!exist) {
      throw new Error('File not found');
    }
    console.log(filePath);
    return filePath;
  }

  async generateImageVariation({ baseImage }) {
    return await imageVariationUseCase(this.openai, { baseImage });
  }
}

module.exports = GptService;