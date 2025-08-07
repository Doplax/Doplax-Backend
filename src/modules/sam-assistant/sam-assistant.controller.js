const SamAssistantService = require('./sam-assistant.service');
const { validationResult } = require('express-validator');

class SamAssistantController {
    constructor() {
        this.samAssistantService = new SamAssistantService();
    }

    createThread = async (req, res) => {
        try {
            const result = await this.samAssistantService.createThread();
            return res.json(result);
        } catch (error) {
            console.error('Error in createThread:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    userQuestion = async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const result = await this.samAssistantService.userQuestion(req.body);
            return res.json(result);
        } catch (error) {
            console.error('Error in userQuestion:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}

module.exports = SamAssistantController;