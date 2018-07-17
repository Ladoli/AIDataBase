const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const cors = require('cors');
const app            = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use( bodyParser.json() );
app.use(cors());


const port = 8000;
require('./routes')(app, {});


app.listen(port, () => {
  console.log('We are live on the ' + port);
});


app.get('/', function (req, res) {
  console.log(req.query.query)
  res.json({"test":"First API"});
})
