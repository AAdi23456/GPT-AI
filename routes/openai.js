import express from 'express'
import * as dotenv from 'dotenv'
import FeedbackModel from '../model/feedback.js'
import { Configuration, OpenAIApi } from 'openai'
import Validate from '../middleware/auth.js'
dotenv.config()

const configuration = new Configuration({
    apiKey: process.env.API_KEY,
});

const openai = new OpenAIApi(configuration);

const AIroutes = express()

AIroutes.use(express.json())

AIroutes.post('/feedback',Validate, async (req, res) => {
    try {
        const { question, answer, email } = req.body;

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `the question is-${question} and answer is-${answer}
      provide me the feedback on scale of 10 on basis of answer,and if answer is null or empty string then provide me the correct answer with 0 marks out of 10
      `,
            temperature: 0,
            max_tokens: 3000,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
        });
        const DataToDb = new FeedbackModel({ question, answer, feedback: response.data.choices[0].text, email })
        await DataToDb.save()
        res.status(200).json({
            bot: response.data.choices[0].text
        });

    } catch (error) {
        console.error(error)
        res.status(500).send(error || 'Something went wrong');
    }
})

AIroutes.post('/questions',Validate, async (req, res) => {
    try {
        const { tech } = req.body;

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `provide me a question related to ${tech} which can be easy,moderate or tough.
        `,
            temperature: 0,
            max_tokens: 3000,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
        });

        res.status(200).json({
            bot: response.data.choices[0].text
        });

    } catch (error) {
        console.error(error)
        res.status(500).send(error || 'Something went wrong');
    }
})

AIroutes.get("/allfeedbacks",async(req,res)=>{
    try {
        const {email}=req.body
        const data=await FeedbackModel.find({email})
        return res.status(200).json(data)
    } catch (error) {
        console.error(error);
        return res.status(500).json(error)
    }
})
export default AIroutes
