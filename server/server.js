const express = require('express');
const cors = require('cors');

// express app
const app = express();
app.use(cors());

// services
const { get_couples, get_words, get_quotes } = require('./services');

// listen for requests

app.get('/get_couples', async (req, res) => {
    const response = await get_couples(100);
    res.send(response);
})

app.get('/get_words', async (req, res) => {
    const response = await get_words(100);
    res.send(response);
})

app.get('/get_quotes', async (req, res) => {
    const response = await get_quotes(20);
    res.send(response);
})

app.listen(4000, () => {
    console.log('listening on port 4000')
});