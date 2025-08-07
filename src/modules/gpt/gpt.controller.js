const GptService = require('./gpt.service');
const { validationResult } = require('express-validator');

class GptController {
  constructor() {
    this.gptService = new GptService();
  }

  basicResponse = (req, res) => {
    return res.json({ message: 'Hello World' });
  }

  orthographyCheck = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const result = await this.gptService.orthographyCheck(req.body);
      return res.json(result);
    } catch (error) {
      console.error('Error in orthographyCheck:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  prosConsDicusser = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const result = await this.gptService.prosConsDicusser(req.body);
      return res.json(result);
    } catch (error) {
      console.error('Error in prosConsDicusser:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  prosConsDicusserStream = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const stream = await this.gptService.prosConsDicusserStream(req.body);

      res.setHeader('Content-Type', 'application/json');
      res.status(200);

      for await (const chunk of stream) {
        const piece = chunk.choices[0].delta.content || '';
        console.log(piece);
        res.write(piece);
      }
      res.end();
    } catch (error) {
      console.error('Error in prosConsDicusserStream:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  translateText = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const result = await this.gptService.translateText(req.body);
      return res.json(result);
    } catch (error) {
      console.error('Error in translateText:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  textToAudio = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const filePath = await this.gptService.textToAudio(req.body);
      res.setHeader('Content-Type', 'audio/mp3');
      res.status(200);
      res.sendFile(filePath);
    } catch (error) {
      console.error('Error in textToAudio:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  getTextToAudio = async (req, res) => {
    try {
      const { fileId } = req.params;
      const filePath = await this.gptService.textToAudioGetter(fileId);
      res.setHeader('Content-Type', 'audio/mp3');
      res.status(200);
      res.sendFile(filePath);
    } catch (error) {
      console.error('Error in getTextToAudio:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  audioToText = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      if (!req.file) {
        return res.status(400).json({ error: 'No audio file provided' });
      }

      const result = await this.gptService.audioToText(req.file, req.body);
      return res.json(result);
    } catch (error) {
      console.error('Error in audioToText:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  imageGeneration = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const result = await this.gptService.imageGeneration(req.body);
      return res.json(result);
    } catch (error) {
      console.error('Error in imageGeneration:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  getGeneration = async (req, res) => {
    try {
      const { filename } = req.params;
      const filePath = await this.gptService.getGeneratedImage(filename);
      res.status(200);
      res.sendFile(filePath);
    } catch (error) {
      console.error('Error in getGeneration:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  imageVariation = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const result = await this.gptService.generateImageVariation(req.body);
      return res.json(result);
    } catch (error) {
      console.error('Error in imageVariation:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = GptController;