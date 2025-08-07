const OpenAI = require('openai');

const prosConsDicusserUseCase = async (openai, { prompt }) => {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: `
        Se te dará una pregunta y tu tarea es dar una respuesta con PROS y Contras,
        La respuesta debe de ser en formato markdown,
        los pros y contras deben de estar en una lista,
        `,
      },
      { role: 'user', content: prompt },
    ],
    store: true,
    max_tokens: 500,
    temperature: 0.8,
  });

  const jsonResp = response.choices[0].message;
  return jsonResp;
};

module.exports = {
  prosConsDicusserUseCase
};