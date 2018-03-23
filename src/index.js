require("nodejs-dashboard");
const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const urlMetadata = require('url-metadata');
const Movie = require('./models/movie');
const cors = require('cors');
const mongoose = require('mongoose');


/**
 * Database connection
 */
mongoose.connect('mongodb://10.31.35.60/interesting-movies');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('\x1b[7m','Successful db connection', '\x1b[0m');
});

/**
 * Validate if the given string is a valid URL
 * @param {String} urlToBeValidated Url to be validated
 */
function validUrl(urlToBeValidated = '') {
  console.log(urlToBeValidated);
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
  '(\\#[-a-z\\d_]*)?$','i'); // fragment locater
  return pattern.test(urlToBeValidated) ? true : false;
};

let movies = [];

/**
 * Express configuration
 */
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.get('/movies', (request, response) => {
  console.log(movies);
  if (movies.length > 0) {
    let keywords = movies[0].keywords.split(', ');
    console.log(keywords);
  }
  response.send({movies});
});

app.post('/movies', (request, response) => {
  if (!request.body || !request.body.url || !validUrl(request.body.url)) {
    return response.status(422).send({ data: request.body, message: 'The given URL is not a valid one.'})
  }
  urlMetadata(request.body.url).then((metadata) => {
    const newMovie = new Movie(metadata);
    movies.push(newMovie);
    response.send(newMovie);
  }).catch((error) => {
    console.log(error)
    response.status(404).send();
  });
});

app.listen(3003, () => console.log('\x1b[7m', 'App listening on port 3003!', '\x1b[0m'))