/* node dependencies */
var express = require('express'),
    app = express(),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    expressValidator = require('express-validator'),
    morgan = require('morgan'),
    auth = require('./service/auth.json'),
    config = require('./service/config');

// connection to mongo database
mongoose.Promise = global.Promise;
mongoose.connect(config.url);

// morgan acts as logger, gives response times on restful api calls
app.use(morgan(config.morgan_setup));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressValidator());
app.use(session({secret: auth.secret, resave: false, saveUninitialized: true}));
app.use(require('./controllers'));

/* start server! */
app.listen(config.localhost_port, function () {
    console.log("Server running on http://localhost:" + config.localhost_port);
});


