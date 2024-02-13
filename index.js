import http from 'http';
import OpenAI from 'openai';
import express from 'express';
import path from 'path';
import 'dotenv/config';


//server creation
const port = 3000;

const app = express();

import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));


app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//Render HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// creating message as global variable
const messages = [];

app.listen(3000, () => {
    console.log('Express server initialized');
});

app.post('/api', async function (req, res, next) {
    console.log(req.body);
    const mes = await main(req.body.input)
    res.json({ success: true, message: mes })
})

// openai api key
const OPENAI_API_KEY = process.env.Secret_key

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY, 
});

async function main(input) {
    messages.push({ role: 'user', content: input })
    console.log(messages)
    const chatCompletion = await openai.chat.completions.create({
        messages: messages,
        model: 'gpt-3.5-turbo',
    });

    // console.log(chatCompletion.choices);
    return chatCompletion.choices[0]?.message?.content;
}

