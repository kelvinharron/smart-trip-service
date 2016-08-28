/* node dependencies */
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    config = require('./service/config');

// connection to mongo database
mongoose.connect(config.url);

// morgan acts as logger, gives response times on restful api calls
app.use(morgan('ACTIVITY LOGGER: :method :url STATUS CODE: :status :response-time ms DATE+TIME: :date[web]'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(require('./controllers'));

//var foursquare = require('node-foursquare')(foursquareConfig);
var foursquareConfig = {
    'secrets': {
        'clientId': '4RZ2AQUMEPIP0FKT4F10FFQC00RGNRYWZTYSGXGHLN3A1XXP',
        'clientSecret': 'O33RMB0UHY5SIJUTPVQZOIWW1X0K020RPZRWZRTDBEEAZKSV',
        'redirectUrl': 'http://localhost:54321/foursquare'
    }
};

/* start server! */
app.listen(config.LOCALHOST, function () {
    console.log("Server running on http://localhost:" + config.LOCALHOST);
});