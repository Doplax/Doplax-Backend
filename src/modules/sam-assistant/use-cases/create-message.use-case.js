const createMessageUseCase = async (openAi, options) => {
    const { threadId, questions } = options;

    const message = await openAi.beta.threads.messages.create(threadId, {
        role: 'user',
        content: questions,
    });

    return message;
};

module.exports = {
    createMessageUseCase
};