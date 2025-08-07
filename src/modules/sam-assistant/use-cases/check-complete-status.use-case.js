const checkCompleteStatusUseCase = async (openAi, options) => {
    const { threadId, runId } = options;

    const runStatus = await openAi.beta.threads.runs.retrieve(threadId, runId);

    console.log({ status: runStatus.status });
    
    if (runStatus.status === 'completed') {
        return { runStatus };           
    }

    // Wait 1 second
    await new Promise(resolve => setTimeout(resolve, 1000));

    return await checkCompleteStatusUseCase(openAi, options); // recursive call
};

module.exports = {
    checkCompleteStatusUseCase
};