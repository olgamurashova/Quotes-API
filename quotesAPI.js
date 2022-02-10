const express = require('express');
const morgan = require('morgan');
const app = express();

const { quotes } = require('./data');
const { getRandomElement, getIndex } = require('./utils');

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
// alternative solution
app.get('/api/quotes', (req, res, next) => {
  if (req.query.person !== undefined){
    const byAuthor = quotes.filter(quote => quote.person === req.query.person);
    res.send({quotes: byAuthor});
  } else {
    res.send({quotes});
  }
});


//passing in a query string with two properties: quote with the quote text itself, and person with the person who is credited with saying the quote.
app.post('/api/quotes', (req, res, next) => {
  const newQuote = {quote: req.body.quote, person: req.body.person};
  if(!newQuote.quote || !newQuote.person) {
    res.status(400).send('Invalid request.')
  } else {
    quotes.push(newQuote);
    res.status(201).send(newQuote);
  }
});


//Adding a PUT route for updating quotes in the data if added id to data.js
app.put('/api/quotes/:id', (req, res, next) => {
    const id = Number(req.params.id);
    const idIndex = getIndex(req.params.id, quotes);
    if (idIndex !== - 1) {
        quotes[idIndex] = req.body.quote;
        res.send(quotes[idIndex]);
    } else {
        res.status(404).send();
    }
});

//Adding a DELETE route for deleting quotes from the data array if id added to data.js
app.delete('/api/quotes/:id', (req, res, next) => {
   const idIndex = getIndex(req.params.id, quotes);
    if (idIndex !== -1) {
        quotes.splice(idIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).send();
    }
});

app.listen(PORT, () => {
  console.log(`Server is listening on ${port}.`);
});
