const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const urlMetadata = require('url-metadata');
const cors = require('cors')
// const {validUrl} = require('./utils');

function validUrl(urlToBeValidated = '') {
  console.log(urlToBeValidated);
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
  '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return pattern.test(urlToBeValidated);
};

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.get('/', (req, res) => res.send('Hello World!'))
app.get('/movie', (request, response) => {
  response.send([
    {
      'name': 'ssdsdsd'
    }
  ]);
});
app.post('/movie', (request, response) => {
  if (!request.body || !request.body.url || !validUrl(request.body.url)) {
    return response.status(422).send({ message: 'The given URL is not a valid one.'})
  }
  urlMetadata(request.body.url).then((metadata) => {
    console.log(metadata)
    response.send(metadata);
  }).catch((error) => {
    console.log(error)
    response.status(404).send();
  });
});

app.listen(3003, () => console.log('App listening on port 3003!'))