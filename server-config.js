var express = require('express');
var cors = require('cors'); // module for handling Cors headers
var handler = require('./lib/request-handler');

var app = express();

app.configure(function() {
  app.use(express.bodyParser());
  app.use(express.static(__dirname + '/app'));
  app.use(cors());
});

app.get('/', handler.renderIndex);

// Note to team: we may need to add routes to handle non-existent routes
app.get('/klicks/:id', handler.handleGetKlicks);
app.get('/klicks', handler.handleGetAllKlicks);
app.post('/klicks', handler.handlePostKlicks);

module.exports = app;