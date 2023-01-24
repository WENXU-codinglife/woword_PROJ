import { async } from "@firebase/util";

const { Configuration, OpenAIApi } = require("openai");

const openAIKey = '';


const configuration = new Configuration({
  apiKey: openAIKey,
});
const openai = new OpenAIApi(configuration);


export const openaiCorrection = async (userMsg) => {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Correct this to standard English:\n\n${userMsg}`,
      temperature: 0,
      max_tokens: 60,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    return response.data.choices[0].text;  
}

export const openaiReply = async (userMsg) => {
    
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: userMsg,
      temperature: 0.9,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0.6,
      stop: [" Human:", " AI:"],
    });
    return response.data.choices[0].text;
}

export const openaiComposer = async (selectedWords) => {
  const queryMsg = `Can you generate a short paragraph that contains the following words: ${selectedWords}.`;
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: queryMsg,
    temperature: 0.9,
    max_tokens: 150,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0.6,
    stop: [" Human:", " AI:"],
  });
  return response.data.choices[0].text;  
}