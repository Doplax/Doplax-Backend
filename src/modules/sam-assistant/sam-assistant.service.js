const OpenAI = require('openai');
const { 
    createThreadUseCase,
    createMessageUseCase,
    createRunUseCase,
    checkCompleteStatusUseCase,
    getMessageListUseCase 
} = require('./use-cases');

class SamAssistantService {
    constructor() {
        if (process.env.OPEN_API_KEY) {
            this.openai = new OpenAI({ apiKey: process.env.OPEN_API_KEY });
        } else {
            console.warn('OpenAI API key not found. Sam Assistant services will not be available.');
            this.openai = null;
        }
    }

    _checkOpenAI() {
        if (!this.openai) {
            throw new Error('OpenAI API key not configured. Please set OPEN_API_KEY environment variable.');
        }
    }

    async createThread() {
        this._checkOpenAI();
        return await createThreadUseCase(this.openai);
    }
    
    async userQuestion(questionDto) {
        this._checkOpenAI();
        const { threadId, question } = questionDto;
        
        const message = await createMessageUseCase(this.openai, {
            threadId: threadId,
            questions: question,
        });

        const run = await createRunUseCase(this.openai, { threadId });

        await checkCompleteStatusUseCase(this.openai, {
            runId: run.id,
            threadId: threadId,
        });

        const messages = await getMessageListUseCase(this.openai, { threadId });

        return messages.reverse();
    }
}

module.exports = SamAssistantService;