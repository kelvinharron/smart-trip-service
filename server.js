/****** node dependencies ******/
var express = require('express'),
    app = express(),
    router = express.Router(),
    bodyParser = require('body-parser').urlencoded({extended: true}),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    passport = require('passport'),
    config = require('./service/config'),
    user = require('./models/user');

// connect to mongo database
mongoose.connect(config.url);

/****** route controllers******/
var itineraryController = require('./controllers/itinerary'),
    eventController = require('./controllers/event');

// morgan used to log REST activity from the express server
app.use(morgan('dev'));

app.use(bodyParser);

// routing
app.use('/api', router);

var foursquareConfig = {
    'secrets': {
        'clientId': '4RZ2AQUMEPIP0FKT4F10FFQC00RGNRYWZTYSGXGHLN3A1XXP',
        'clientSecret': 'O33RMB0UHY5SIJUTPVQZOIWW1X0K020RPZRWZRTDBEEAZKSV',
        'redirectUrl': 'http://localhost:54321/foursquare'
    }
};

/**
 * https://foursquare.com/oauth2/authenticate
 ?client_id=4RZ2AQUMEPIP0FKT4F10FFQC00RGNRYWZTYSGXGHLN3A1XXP
 &response_type=code
 &redirect_uri=http://localhost:54321/foursquare
 */

var foursquare = require('node-foursquare')(foursquareConfig);

var foursquareAccessToken = '';

/****** itinerary routes ******/
router.route('/itinerary').get(itineraryController.getAllItinerarys);
router.route('/itinerary').post(itineraryController.createItinerary);
router.route('/itinerary/:_id').get(itineraryController.getItinerary);
router.route('/itinerary/:_id').put(itineraryController.updateItinerary);
router.route('/itinerary/:_id').delete(itineraryController.deleteItinerary);

/****** event routes ******/
router.route('/event').get(eventController.getAllEvents);
router.route('/event').post(eventController.createEvent);
router.route('/event/:_id').delete(eventController.deleteEvent);

app.use(function (req, res, err) {
    res.status(err.status || 500);
    res.json({
        message: 'Server home',
        error: err
    });
});

/****** start server ******/
app.listen(config.LOCALHOST);
console.log("Server running on http://localhost:" + config.LOCALHOST);