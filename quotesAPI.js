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

//returning all quotes by the same person;
app.get('/api/quotes', (req, res, next) => {
    if (!req.query.person) {
      res.send({quotes: quotes});
  } else {
    let personQuotes = [];
    for (let i = 0; i <= quotes.length; i++) {
        if (quotes[i].person === req.query.person) {
            personQuotes.push(quotes[i]);
        }
    }
    res.send({quotes: personQuotes});
    next();
}     
});

app.post('/api/quotes', (req, res, next) => {
  const newQuote = {quote: req.body.quote, person: req.body.person};
  if(!newQuote.quote || !newQuote.person) {
    res.status(400).send('Invalid request.')
  } else {
    quotes.push(newQuote);
    res.status(201).send(newQuote);
  }
});


