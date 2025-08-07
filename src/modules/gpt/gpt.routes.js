const { Router } = require('express');
const multer = require('multer');
const path = require('path');
const GptController = require('./gpt.controller');

const {
  orthographyValidator,
  prosConsDiscusserValidator,
  translateValidator,
  textToAudioValidator,
  audioToTextValidator,
  imageGenerationValidator,
  imageVariationValidator
} = require('./validators');

const router = Router();
const gptController = new GptController();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: './generated/uploads',
  filename: (req, file, cb) => {
    const fileExtension = file.originalname.split('.').pop();
    const fileName = `${new Date().getTime()}.${fileExtension}`;
    return cb(null, fileName);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('audio/')) {
      cb(null, true);
    } else {
      cb(new Error('File must be an audio file'), false);
    }
  }
});

/**
 * @swagger
 * tags:
 *   name: GPT
 *   description: API para servicios de GPT
 */

/**
 * @swagger
 * /api/gpt:
 *   get:
 *     summary: Respuesta básica del servicio GPT
 *     tags: [GPT]
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.get('/', gptController.basicResponse);

/**
 * @swagger
 * /api/gpt/orthography-check:
 *   post:
 *     summary: Verificar ortografía de un texto
 *     tags: [GPT]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               prompt:
 *                 type: string
 *               maxTokens:
 *                 type: integer
 *                 minimum: 1
 *     responses:
 *       200:
 *         description: Análisis de ortografía completado
 */
router.post('/orthography-check', orthographyValidator, gptController.orthographyCheck);

/**
 * @swagger
 * /api/gpt/pros-cons-discusser:
 *   post:
 *     summary: Generar pros y contras sobre un tema
 *     tags: [GPT]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               prompt:
 *                 type: string
 *     responses:
 *       200:
 *         description: Pros y contras generados
 */
router.post('/pros-cons-discusser', prosConsDiscusserValidator, gptController.prosConsDicusser);

/**
 * @swagger
 * /api/gpt/pros-cons-discusser-stream:
 *   post:
 *     summary: Generar pros y contras con streaming
 *     tags: [GPT]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               prompt:
 *                 type: string
 *     responses:
 *       200:
 *         description: Stream de pros y contras
 */
router.post('/pros-cons-discusser-stream', prosConsDiscusserValidator, gptController.prosConsDicusserStream);

/**
 * @swagger
 * /api/gpt/translate:
 *   post:
 *     summary: Traducir texto a otro idioma
 *     tags: [GPT]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               prompt:
 *                 type: string
 *               lang:
 *                 type: string
 *     responses:
 *       200:
 *         description: Texto traducido
 */
router.post('/translate', translateValidator, gptController.translateText);

/**
 * @swagger
 * /api/gpt/text-to-audio:
 *   post:
 *     summary: Convertir texto a audio
 *     tags: [GPT]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               prompt:
 *                 type: string
 *               voice:
 *                 type: string
 *     responses:
 *       200:
 *         description: Archivo de audio generado
 *         content:
 *           audio/mp3:
 *             schema:
 *               type: string
 *               format: binary
 */
router.post('/text-to-audio', textToAudioValidator, gptController.textToAudio);

/**
 * @swagger
 * /api/gpt/text-to-audio/{fileId}:
 *   get:
 *     summary: Obtener archivo de audio generado
 *     tags: [GPT]
 *     parameters:
 *       - in: path
 *         name: fileId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Archivo de audio
 *         content:
 *           audio/mp3:
 *             schema:
 *               type: string
 *               format: binary
 */
router.get('/text-to-audio/:fileId', gptController.getTextToAudio);

/**
 * @swagger
 * /api/gpt/audio-to-text:
 *   post:
 *     summary: Convertir audio a texto
 *     tags: [GPT]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               prompt:
 *                 type: string
 *     responses:
 *       200:
 *         description: Texto transcrito del audio
 */
router.post('/audio-to-text', upload.single('file'), audioToTextValidator, gptController.audioToText);

/**
 * @swagger
 * /api/gpt/image-generation:
 *   post:
 *     summary: Generar imagen con IA
 *     tags: [GPT]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               prompt:
 *                 type: string
 *               originalImage:
 *                 type: string
 *               maskImage:
 *                 type: string
 *     responses:
 *       200:
 *         description: Imagen generada
 */
router.post('/image-generation', imageGenerationValidator, gptController.imageGeneration);

/**
 * @swagger
 * /api/gpt/image-generation/{filename}:
 *   get:
 *     summary: Obtener imagen generada
 *     tags: [GPT]
 *     parameters:
 *       - in: path
 *         name: filename
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Archivo de imagen
 *         content:
 *           image/png:
 *             schema:
 *               type: string
 *               format: binary
 */
router.get('/image-generation/:filename', gptController.getGeneration);

/**
 * @swagger
 * /api/gpt/image-variation:
 *   post:
 *     summary: Crear variación de imagen
 *     tags: [GPT]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               baseImage:
 *                 type: string
 *     responses:
 *       200:
 *         description: Variación de imagen creada
 */
router.post('/image-variation', imageVariationValidator, gptController.imageVariation);

module.exports = router;