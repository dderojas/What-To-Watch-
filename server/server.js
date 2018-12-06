const bodyParser = require('body-parser');
const express = require('express');

var app = express();

app.use(express.static(`${__dirname}/../client/dist/`));
app.use(bodyParser.json());

module.exports = app;