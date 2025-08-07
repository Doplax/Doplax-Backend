const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');
const { downloadImageAsPng, downloadBase64ImageAsPng } = require('../helpers');

const imageGenerationUseCase = async (openai, options) => {
  const { prompt, originalImage, maskImage } = options;

  // Todo: Verificar original image
  if (!originalImage || !maskImage) {
    const response = await openai.images.generate({
      prompt: prompt,
      model: 'dall-e-3',
      n: 1,
      size: '1024x1024',
      quality: 'standard',
      response_format: 'url',
    });

    const fileName = await downloadImageAsPng(response.data[0].url);
    const url = `${process.env.SERVER_URL}/gpt/image-generation/${fileName}`;

    return {
      url: url,
      openAIUrl: response.data[0].url,
      revised_prompt: response.data[0].revised_prompt,
    };
  }

  // Image edit case
  const pngImagePath = await downloadImageAsPng(originalImage, true);
  const maskImagePath = await downloadBase64ImageAsPng(maskImage, true);

  const response = await openai.images.edit({
    prompt: prompt,
    model: 'dall-e-2',
    image: fs.createReadStream(pngImagePath),
    mask: fs.createReadStream(maskImagePath),
    n: 1,
    size: '1024x1024',
    response_format: 'url',
  });

  const fileName = await downloadImageAsPng(response.data[0].url);
  const url = `${process.env.SERVER_URL}/gpt/image-generation/${fileName}`;
  
  return {
    url: url,
    openAIUrl: response.data[0].url,
    revised_prompt: response.data[0].revised_prompt,
  };
};

module.exports = {
  imageGenerationUseCase
};