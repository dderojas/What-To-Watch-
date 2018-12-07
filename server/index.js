const bodyParser = require('body-parser');
const express = require('express');
const db = require('../database/index.js');

var app = express();

app.use(express.static(`${__dirname}/../client/dist/`));
app.use(bodyParser.json());

app.get('/test:primarytitle', (req,res) => {

console.log('hey');

});


// console.log(db.getTitles());

app.listen(3000, function() {
  console.log('server connected');
});

module.exports = app;


// db.sync({force: true}).then(() => {
//   app.listen(3000, function() {
//     console.log(db.sequelize,'server connected');
//   });
// });