const express = require('express');
const morgan = require('morgan');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

/*sending back a random quote with the response body 
{
  quote: {/* quote object */}
} */
app.get('/api/quotes/random', (req, res, next) => {
  res.send({quote: getRandomElement(quotes)});
  next();
})

//returning all quotes
app.get('/api/quotes', (req, res, next) => {
  res.send(quotes);
});
