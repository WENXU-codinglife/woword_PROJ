import { async } from "@firebase/util";
const { Configuration, OpenAIApi } = require("openai");



var CryptoJS = require("crypto-js");
var ciphertext = 'U2FsdGVkX19JgF0iF6xKQcPTVN5eHlsbZx3nzSY+cTQiVMRZp/fKfh3aDBFIggDKqH3U/raybtwm4TOri77r4MdeR9ialgCslLiS0TFFjko=';
const decryptionStr = ( ciphertext ) =>{
    // Decrypt
    const bytes  = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
}
const openAIKey = decryptionStr(ciphertext);

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

export const openaiOptimizer = async (paragraph) => {
  const queryMsg = `Can you check and optimizer this paragraph: ${paragraph}.`;
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: queryMsg,
    temperature: 0.9,
    max_tokens: 800,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0.6,
    stop: [" Human:", " AI:"],
  });
  return response.data.choices[0].text;  
}