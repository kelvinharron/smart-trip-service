// Node dependencies
var express = require('express'), // Routing middleware
    app = express(), // Express function tied to app reference
    session = require('express-session'),
    bodyParser = require('body-parser'),
    expressValidator = require('express-validator'),
    database = require('./service/database'),
    morgan = require('morgan'),
    config = require('./service/settings');

app.use(morgan(config.morgan.format));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressValidator());
app.use(session({secret: config.auth.secret, resave: false, saveUninitialized: true}));
app.use(require('./controller'));

app.listen(config.server.port, function () {
    console.log("Server running on http://localhost:" + config.server.port);
});

