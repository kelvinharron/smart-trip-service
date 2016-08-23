// node dependencies
var express = require('express'),
    expressSession = require('express-session'),
    app = express(),
    router = express.Router(),
    bodyParser = require('body-parser').urlencoded({extended: true}),
    cookieParser = require('cookie-parser'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    socketio = require('socket.io'),
    passport = require('passport'),
    localStrategy = require('passport-local'),

    jwt = require('jsonwebtoken'),
    config = require('./service/db'),
    user = require('./models/user'),

    googleMapsClient = require('@google/maps').createClient({
        key: 'AIzaSyCgrqJvbZQyT6WqOzu4UI7hWA4i0qpNo3U'
    });

mongoose.connect(config.url);


// my dependencies used for file paths and port number
var itineraryController = require('./controllers/itinerary');
var eventController = require('./controllers/event');
var LOCALHOST_PORT = process.env.PORT || 54321;

app.set('superSecret', config.secret);
app.use(morgan('dev'));

// routing
app.use('/api', router);
app.use(cookieParser());
app.use(expressSession({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy.Strategy(function (username, password) {

}));

// itinerary routes
router.route('/itinerary').get(itineraryController.getAllItinerarys);
router.route('/itinerary').post(itineraryController.createItinerary);
router.route('/itinerary/:_id').get(itineraryController.getItinerary);
router.route('/itinerary/:_id').put(itineraryController.updateItinerary);
router.route('/itinerary/:_id').delete(itineraryController.deleteItinerary);

// event routes
//router.route('/itinerary/:_id/event').post(eventController.createEvent);

app.post('/login', passport.authenticate('local'), function (req, res) {

});

app.listen(LOCALHOST_PORT);
console.log("Running on " + LOCALHOST_PORT);