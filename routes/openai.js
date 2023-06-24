import express from 'express';
import * as dotenv from 'dotenv';
import FeedbackModel from '../model/feedback.js';
import { Configuration, OpenAIApi } from 'openai';
import Validate from '../middleware/auth.js';

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});

const openai = new OpenAIApi(configuration);
const AIroutes = express();



let previousQuestions = []; // Array to store previously generated questions

AIroutes.post('/feedback', Validate, async (req, res) => {
  try {
    const { question, answer, email } = req.body;

    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `the question is-${question} and answer is-${answer}
      provide me the feedback on a scale of 10 on the basis of the answer, and if the answer is null or an empty string, then provide me the correct answer with 0 marks out of 10
      `,
      temperature: 0,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });

    const DataToDb = new FeedbackModel({ question, answer, feedback: response.data.choices[0].text, email });
    await DataToDb.save();

    res.status(200).json({
      bot: response.data.choices[0].text,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error || 'Something went wrong');
  }
});

AIroutes.post('/questions, async (req, res) => {
  try {
    const { tech } = req.body;

    let question;
    let response;

    do {
      response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `provide me a unique random question related to ${tech} every time, strictly don't repeat a question from previous responses.`,
        temperature: 1.2,
        max_tokens: 3000,
        top_p: 1,
        frequency_penalty: 0.5,
        presence_penalty: 0,
      });

      question = response.data.choices[0].text.trim();
    } while (previousQuestions.includes(question)); // Generate a new question if it already exists in the previousQuestions array

    previousQuestions.push(question); // Store the new question in the previousQuestions array

    res.status(200).json({
      bot: question,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error || 'Something went wrong');
  }
});

AIroutes.get('/allfeedbacks',Validate, async (req, res) => {
  try {
    const { email } = req.body;
    const data = await FeedbackModel.find({ email });
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
});

export default AIroutes;
