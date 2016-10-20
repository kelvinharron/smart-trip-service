/**
 *  server.js - entry point to our application where we start up our server, database and middleware connections.
 */
var express = require('express'),
    app = express(),
    session = require('express-session'), // TODO: build session module with JWT functionality
    bodyParser = require('body-parser'),
    expressValidator = require('express-validator'),
    morgan = require('morgan'),
    config = require('./service/settings');

app.use(morgan(config.morgan.format));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); // POSTMAN TESTING
app.use(expressValidator({}));
app.use(session({secret: config.auth.secret, resave: false, saveUninitialized: true}));
app.use(require('./controller'));

app.on('error', function (err) {
    console.log("Error starting server middleware:");
    console.log(err);
});

// Start point of the application
app.listen(config.server.address, function () {
    console.log("Server running on http://localhost:" + config.server.address);
});