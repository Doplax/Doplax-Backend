const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const downloadImageAsPng = async (url, fullPath = false) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Error downloading image');
  }

  const folderPath = path.resolve('./', './generated/images/');
  fs.mkdirSync(folderPath, { recursive: true }); // Create folder if not exists

  const imageNamePng = `${Date.now()}.png`;
  const buffer = Buffer.from(await response.arrayBuffer());

  const completePath = path.join(folderPath, imageNamePng);

  await sharp(buffer).png().ensureAlpha().toFile(completePath);

  return fullPath ? completePath : imageNamePng;
};

const downloadBase64ImageAsPng = async (base64Image, fullPath = false) => {
  // Remove header
  base64Image = base64Image.split(';base64,').pop();
  const imageBuffer = Buffer.from(base64Image, 'base64');

  const folderPath = path.resolve('./', './generated/images/');
  fs.mkdirSync(folderPath, { recursive: true });

  const imageNamePng = `${new Date().getTime()}-64.png`;

  const completePath = path.join(folderPath, imageNamePng);

  // Transform to RGBA, png // As OpenAI expects
  await sharp(imageBuffer).png().ensureAlpha().toFile(completePath);

  return fullPath ? completePath : imageNamePng;
};

module.exports = {
  downloadImageAsPng,
  downloadBase64ImageAsPng
};