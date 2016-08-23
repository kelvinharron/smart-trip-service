// node dependencies
var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser').urlencoded({extended:true});
var mongoose = require('mongoose');
var socketio = require('socket.io');
var passport = require('passport');
var googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyCgrqJvbZQyT6WqOzu4UI7hWA4i0qpNo3U'
});

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/itineraryapp');
var db = mongoose.connection;



// my dependencies used for file paths and port number
var itineraryController = require('./controllers/itinerary');
var eventController = require('./controllers/event');
var LOCALHOST_PORT = 54321;

app.use(passport.initialize());
app.use(passport.session());

// routing
app.use('/api', router);

// itinerary routes
router.route('/itinerary').get(itineraryController.getAllItinerarys);
router.route('/itinerary').post(itineraryController.createItinerary);
router.route('/itinerary/:_id').get(itineraryController.getItinerary);
router.route('/itinerary/:_id').put(itineraryController.updateItinerary);
router.route('/itinerary/:_id').delete(itineraryController.deleteItinerary);

// event routes
//router.route('/itinerary/:_id/event').post(eventController.createEvent);


app.listen(LOCALHOST_PORT);
console.log("Running on " + LOCALHOST_PORT);