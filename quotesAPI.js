const express = require('express');
const morgan = require('morgan');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

//sending back a random quote
app.get('/api/quotes/random', (req, res, next) => {
  res.send(getRandomElement(quotes));
});

//returning all quotes
app.get('/api/quotes', (req, res, next) => {
  res.send(quotes);
});
