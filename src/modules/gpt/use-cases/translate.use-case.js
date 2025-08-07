const OpenAI = require('openai');

const translateUseCase = async (openai, options) => {
  const { prompt, lang } = options;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: `
          Traduce el siguiente texto al idioma ${lang}:${prompt}`,
      },
      { 
        role: 'user', 
        content: prompt 
      },
    ],
    store: true,
    temperature: 0.2,
  });

  return {
    message: response.choices[0].message.content
  };
};

module.exports = {
  translateUseCase
};