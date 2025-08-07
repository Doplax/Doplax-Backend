const createThreadUseCase = async (openAi) => {
    const thread = await openAi.beta.threads.create({});

    const { id } = thread;
    console.log(thread);
    
    return { id };
};

module.exports = {
    createThreadUseCase
};