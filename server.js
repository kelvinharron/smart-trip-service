// =======================
// node dependencies ======
// =======================
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
    config = require('./service/config'),
    user = require('./models/user');

// connect to mongo database
mongoose.connect(config.url);

// =======================
// route controllers ======
// =======================
var itineraryController = require('./controllers/itinerary');
var eventController = require('./controllers/event');

// morgan used to log REST activity from the express server
app.use(morgan('dev'));

// routing
app.use('/api', router);

// =======================
// itinerary API routes ======
// =======================
router.route('/itinerary').get(itineraryController.getAllItinerarys);
router.route('/itinerary').post(itineraryController.createItinerary);
router.route('/itinerary/:_id').get(itineraryController.getItinerary);
router.route('/itinerary/:_id').put(itineraryController.updateItinerary);
router.route('/itinerary/:_id').delete(itineraryController.deleteItinerary);

// =======================
// event API routes ======
// =======================
router.route('/event').get(eventController.getAllEvents);
router.route('/event').post(eventController.createEvent);
router.route('/event/:_id').delete(eventController.deleteEvent);

// =======================
// START SERVER ======
// =======================
app.listen(config.LOCALHOST);
console.log("Server running on http://localhost:" + config.LOCALHOST);