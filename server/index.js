const bodyParser = require('body-parser');
const express = require('express');
const db = require('../database/index.js');

var app = express();

app.use(express.static(`${__dirname}/../client/dist/`));
app.use(bodyParser.json());

app.get('/movies', (req,res) => {

  console.log('queryTest',req.query);

  var query = {
    text:'SELECT originaltitle FROM titles WHERE startyear=$1',
    values:[req.query.year]
  }

  db.getTitles(query,res);

});

app.listen(3000, function() {
  console.log('server connected');
});

module.exports = app;