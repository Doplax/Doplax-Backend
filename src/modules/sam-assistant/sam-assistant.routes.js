const { Router } = require('express');
const SamAssistantController = require('./sam-assistant.controller');
const { questionValidator } = require('./validators');

const router = Router();
const samAssistantController = new SamAssistantController();

/**
 * @swagger
 * tags:
 *   name: Sam Assistant
 *   description: API para el asistente Sam basado en OpenAI Assistant
 */

/**
 * @swagger
 * /api/sam-assistant/create-thread:
 *   post:
 *     summary: Crear un nuevo hilo de conversación
 *     tags: [Sam Assistant]
 *     responses:
 *       200:
 *         description: Hilo creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID del hilo creado
 */
router.post('/create-thread', samAssistantController.createThread);

/**
 * @swagger
 * /api/sam-assistant/user-question:
 *   post:
 *     summary: Enviar una pregunta al asistente Sam
 *     tags: [Sam Assistant]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               threadId:
 *                 type: string
 *                 description: ID del hilo de conversación
 *               question:
 *                 type: string
 *                 description: Pregunta para el asistente
 *             required:
 *               - threadId
 *               - question
 *     responses:
 *       200:
 *         description: Respuesta del asistente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   role:
 *                     type: string
 *                     enum: [user, assistant]
 *                   content:
 *                     type: array
 *                     items:
 *                       type: string
 */
router.post('/user-question', questionValidator, samAssistantController.userQuestion);

module.exports = router;