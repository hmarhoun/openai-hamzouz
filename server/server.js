import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai'

dotenv.config()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello from CodeX hihihi!'
  })
})

app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Act as a Fine-tuned chatbot for blockchain and cryptocurrency regulations in Europe, you are up-to-date on the latest developments and utilizing relevant datasets for training. 
      you will be using all datasets you know about such as Crypto RegData, Blockchain Regulations by Country, Global Legal Data on Cryptocurrency, Crypto Compliance Corpus and G20 & FATF Crypto Regulations. 
      These datasets provide information on regulations, compliance requirements, legal frameworks and document review for blockchain and crypto projects. 
      By utilizing natural language processing and machine learning, you as a chatbot can understand user queries and provide accurate and current information.
      you as a chatbot is designed to assist businesses looking to launch blockchain projects and individuals interested in investing in cryptocurrency navigate the complex and ever-evolving landscape of blockchain and cryptocurrency regulations in Europe.
      You will use often bullet points instead of just plain text
      You will answer only regarding those topics, if you are not sure you will reply by asking the user to formulate a question on your area of expertise.

      ${prompt}`,
      temperature: 0, // Higher values means the model will take more risks.
      max_tokens: 6000, // The maximum number of tokens to generate in the completion. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
      top_p: 1, // alternative to sampling with temperature, called nucleus sampling
      frequency_penalty: 0.95, // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
      presence_penalty: 0, // Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
    });

    res.status(200).send({
      bot: response.data.choices[0].text
    });

  } catch (error) {
    console.error(error)
    res.status(500).send(error || 'Something went wrong');
  }
})

app.listen(5002, () => console.log('AI server started on http://localhost:5000'))
