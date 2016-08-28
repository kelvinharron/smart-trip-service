/* node dependencies */
var express = require('express'),
    app = express(),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    config = require('./service/config');

// connection to mongo database
mongoose.connect(config.URL);

// morgan acts as logger, gives response times on restful api calls
app.use(morgan('ACTIVITY LOGGER | METHOD = :method. URL = :url. STATUS = :status. RESPONSE TIME = :response-time ms. DATE+TIME = :date[web].'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({secret: config.SECRET, resave: false, saveUninitialized: true}));
app.use(require('./controllers'));


/* start server! */
app.listen(config.LOCALHOST, function () {
    console.log("Server running on http://localhost:" + config.LOCALHOST);
});