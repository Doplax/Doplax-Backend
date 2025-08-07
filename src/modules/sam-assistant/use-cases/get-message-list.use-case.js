const getMessageListUseCase = async (openAi, options) => {
    const { threadId } = options;

    const messageList = await openAi.beta.threads.messages.list(threadId);

    const messages = messageList.data.map((message) => ({
        role: message.role,
        content: message.content.map((content) => content.text.value),
    }));

    return messages;
};

module.exports = {
    getMessageListUseCase
};