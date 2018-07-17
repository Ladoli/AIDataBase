const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db             = require('mysql');
const cors = require('cors');
const app            = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use( bodyParser.json() );
app.use(cors());


const port = 8000;
require('./routes')(app, {});

var con = db.createConnection({
  host: "my3300db.cpqjuav2elw2.us-west-2.rds.amazonaws.com",
  user: "masteruser",
  password: "masterpass",
  database: "csis3300project"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.listen(port, () => {
  console.log('We are live on the ' + port);
});


app.get('/', function (req, res) {
  console.log(req.query.query);
  //var sql = "SELECT * FROM " + req.query.query + " LIMIT 100";
  con.query(req.query.query +" LIMIT 5", function (err, result) {
    if (err) throw err;
    //console.log("Result: " + JSON.stringify(result[0]));
    
    res.json(result);

  });

  
})
