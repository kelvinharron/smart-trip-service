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
 *  Get all Itineraries route - HTTP POST method
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
        if (itinerary.length == 0) {
            console.log("not found")
        } else {
            res.json(trip);
        }
    })
});

router.get('/:_id', function (req, res, next) {
    Itinerary.findById(req.params._id, function (err, trip) {
        handleErr(err, next);
        if (trip == null) {
            console.log("not found");
        } else {
            res.json(trip);
        }
    })
});

router.post('/', function (req, res, next) {
    var trip = new Trip({
        tripName: req.body.tripName,
        tripCity: req.body.tripCity
    });
    trip.save(function (err) {
        handleErr(err, next);

        return res.json(trip);
    })
});

router.put('/:_id', function (req, res, next) {
    Trip.update({_id: req.params._id}, {
        tripName: req.body.tripName,
        tripCity: req.body.tripCity,
        dateCreated: Date.now()
    }, function (err, trip) {
        handleErr(err, next);
        res.json(trip);
    })
});

router.delete('/:_id', function (req, res, next) {
    Trip.remove({_id: req.params._id}, function (err) {
        handleErr(err, next);
        res.json({message: "Trip removed"})
    })
});

/**
 *
 * Simple responses handler function that slightly improves code readability in the api routes.
 *
 * @param err thrown by service
 * @param next return responses without crashing service
 * @returns {*}
 */
function handleErr(err, next) {
    if (err) return next(err);
}

// Object returns access to all routes when required by other node js files
module.exports = router;