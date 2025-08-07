const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');
const { downloadImageAsPng, downloadBase64ImageAsPng } = require('../helpers');

const imageVariationUseCase = async (openai, options) => {
  const { baseImage } = options;

  const pngImageFullPath = await downloadImageAsPng(baseImage, true);
  console.log(pngImageFullPath);

  const response = await openai.images.createVariation({
    model: 'dall-e-2',
    image: fs.createReadStream(pngImageFullPath),
    n: 1,
    size: '1024x1024',
    response_format: 'url',
  });

  const fileName = await downloadImageAsPng(response.data[0].url);
  const url = `${process.env.SERVER_URL}/gpt/image-generation/${fileName}`;

  console.log('tomate'); 
  return { 
    url: url,
    openAIUrl: response.data[0].url,
    revised_prompt: response.data[0].revised_prompt
  };
};

module.exports = {
  imageVariationUseCase
};