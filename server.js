/* node dependencies */
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    config = require('./service/config');

// connect to mongo database
mongoose.connect(config.url);

// morgan used to log REST activity from the express server
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// middleware controller
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