const bodyParser = require('body-parser');
const express = require('express');
const db = require('../database/index.js');

var app = express();

app.use(express.static(`${__dirname}/../client/dist/`));
app.use(bodyParser.json());

app.get('/movies', (req,res) => {
  console.log('movies!',req.query);

  var query = {
    text:'SELECT primarytitle,tconst FROM titles WHERE genres=$1 AND startyear=$2 LIMIT 25',
    values:[req.query.genre, req.query.year]
  }

  db.getTitles(query,res);

  if(req.query.genre.length !== 0 && req.query.year !== 0) {
    db.getTitles(query,res);
  }

});

app.get('/movies/year', (req,res) => {
  console.log('year!',req.query);

  var query = {
    text:'SELECT primarytitle FROM titles WHERE startyear=$1 LIMIT 25',
    values:[req.query.year]
  }

  db.getTitles(query,res);
});


app.get('/movies/genre', (req,res) => {
  console.log('genres!',req.query);

  var query = {
    text:'SELECT primarytitle FROM titles WHERE genres=$1 LIMIT 25',
    values:[req.query.genre]
  }

  db.getTitles(query,res);
});

app.get('/movies/sorted', (req,res) => {

  var query = {
    text:'SELECT primarytitle,tconst FROM titles WHERE genres=$1 AND startyear=$2 LIMIT 25',
    values:[req.query.genre, req.query.year]
  }

  db.getSortedTitles(query,res);

});

app.listen(3000, function() {
  console.log('server connected');
});

module.exports = app;