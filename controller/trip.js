/**
 *  controller/trip.js - Controller requires trip model, holds all RESTful API end points and business logic for:
 *  creating a new trip
 *  retrieving a trip
 *  updating a trip
 *  deleting a trip
 *  get single trip by ID - DEPRECATED
 */

// Import required modules for database ops and routing
var mongoose = require('mongoose'),
    Trip = require('../model/trip'),
    config = require('../service/settings'),
    express = require('express'),
    router = express.Router();

/**
 *  Get all trips route - HTTP GET method
 *  url accessed by app = api/user/login
 *
 *  Takes userValidation function in argument which is performed when route accessed.
 *  First we search for a user with the request body email sent and handle any errors that might occur.
 *  If the user email is not found, return a 400 to the user.
 *  If the user IS FOUND, we compare the password in the request body with the hashed password in the database.
 *  If the password is correct, return a 200 success to the user which authenticates login.
 *  If the password is incorrect, return a 400 to the user.
 */
router.get('/', function (req, res, next) {
    Trip.find({}).lean().exec(function (err, trip) {
        handleErr(err, next);
        if (trip.length == 0) {
            res.status(config.http.NOTFOUND_RESPONSE_CODE).send(config.responses.NOT_FOUND);
            return;
        } else {
            res.status(config.http.SUCCESS_RESPONSE_CODE).send(trip);
        }
    });
});



/**
 * Create trip route - HTTP POST method
 * url accessed by app = api/trip/
 *
 *
 */
router.post('/', tripValidation, function (req, res, next) {
    var trip = new Trip({
        tripName: req.body.tripName,
        tripCity: req.body.tripCity,
        startDate: req.body.startDate,
        endDate: req.body.endDate
    });
    trip.save(function (err) {
        handleErr(err, next);
        res.status(config.http.SUCCESS_RESPONSE_CODE).send(config.responses.TRIP_CREATED_SUCCESS);
    })
});

/**
 * GET A single route - HTTP GET method
 * url accessed by app = api/trip//"tripName"
 *
 * Tripname parameter used in mongoose search query.
 *
 * If the trip is found, return all details of the trip otherwise send a not found response.
 */
router.get('/:tripName', function (req, res, next) {
    Trip.findOne({tripName: req.params.tripName}, function (err, trip) {
        handleErr(err, next);
        if (trip == null) {
            res.status(config.http.NOTFOUND_RESPONSE_CODE).send(config.responses.NOT_FOUND);
        } else {
            res.status(config.http.SUCCESS_RESPONSE_CODE).send(trip);
        }
    });
});

/**
 * UPDATE a single route - HTTP PUT method
 * url accessed by app = api/trip/"tripname"
 */
router.put('/:tripName', tripValidation, function (req, res, next) {
    Trip.findOneAndUpdate({tripName: req.params.tripName}, {
        tripName: req.body.tripName,
        tripCity: req.body.tripCity,
        startDate: req.body.startDate,
        endDate: req.body.endDate
    }, function (err, trip) {
        handleErr(err, next);
        res.status(config.http.SUCCESS_RESPONSE_CODE).send(trip)
    })
});

router.delete('/:_id', function (req, res, next) {
    Trip.findOneAndRemove({tripName: req.body.tripName}, function (err) {
        handleErr(err, next);
        res.status(config.http.SUCCESS_RESPONSE_CODE).send(config.responses.TRIP_DELETED_SUCCESS);
    })
});

/**
 * Simple responses handler function that slightly improves code readability in the api routes.
 *
 * @param err thrown by service
 * @param next return responses without crashing service
 * @returns {*}
 */
function handleErr(err, next) {
    if (err) return next(err);
}

/**
 * Validates trip create requests by checking if tripname and trip city is valid using ExpressValidator
 * Sends a HTTP 400 response to the user if invalid else invokes next route handler
 *
 * @param req user request
 * @param res service response
 * @param next invokes the next route handler
 */
function tripValidation(req, res, next) {
    req.check('tripName', 'Empty trip name').notEmpty();
    req.check('tripCity', 'Empty city name').notEmpty();
    var validationErrors = req.validationErrors(true);
    if (validationErrors) {
        res.status(config.http.BAD_RESPONSE_CODE).send(config.responses.BAD_TRIP_DETAILS);
        return;
    } else {
        next();
    }
};

// Object returns access to all routes when required by other node js files
module.exports = router;