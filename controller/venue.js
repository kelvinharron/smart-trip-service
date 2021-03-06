/**
 *  controller/venue.js - Controller requires venue model, holds API end points and business logic for:
 *  searching for a venue
 *  saving a venue
 *  deleting a venue
 */

// Import required modules for database ops with user model and routing with express.
var mongoose = require('mongoose'),
    Venue = require('../model/venue'),
    express = require('express'),
    router = express.Router(),
    config = require('../service/settings'),
    googleMapsClient = require('@google/maps').createClient({
        key: config.google.mapsKey
    });

/**
 * Search route - HTTP POST method
 * url accessed by app = api/venue/search
 *
 * This route is used to conduct searches to the Google Places API.
 * A validation function checks the req.body details and if valid,
 * passes them to a Google Search method that returns a callback.
 *
 * The callback either returns null or data that we format before sending to the user.
 */
router.post('/search', googleValidation, function (req, res) {
    var venueType = req.body.venueQuery;
    var userLocation = req.body.latitude + ',' + req.body.longitude;

    googleSearchRequest(venueType, userLocation, function (result) {
        if (result == null) {
            res.status(config.http.NOTFOUND_RESPONSE_CODE).send(config.responses.NO_VENUES_FOUND);
        }
        console.log(result)
        res.status(config.http.SUCCESS_RESPONSE_CODE).send(result);
    });
});

/**
 * Save venue route - HTTP POST method
 * url accesed by app = api/venue/
 *
 * This route is used to save a selected venue from the search route.
 * A validation function checks the req.body details and if valid,
 * creates a new venue object that is saved to the database.
 * Success message sent to client on completion.
 */
router.post('/', venueValidation, function (req, res, next) {
    var newVenue = new Venue({
        venueName: req.body.venueName,
        venueAddress: req.body.venueAddress,
        venueLatitude: req.body.venueLatitude,
        venueLongitude: req.body.venueLongitude
    });
    newVenue.save(function (err) {
        handleErr(err, next);
        res.status(config.http.SUCCESS_RESPONSE_CODE).send(config.responses.VENUE_CREATED_SUCCESS);
    });
});

/**
 * GET all venue route - HTTP GET methdo
 * url accesed by app = api/venue
 *
 * This route is used to get a list of all of the venues saved to the database.
 * Returns success code and sends list to client, otherwise return if no venues available.
 */
router.get('/', function (req, res, next) {
    Venue.find({}).lean().exec(function (err, venue) {
        handleErr(err, next);
        if (venue.length != 0) {
            res.status(config.http.SUCCESS_RESPONSE_CODE).send(venue);
        } else {
            res.status(config.http.NOTFOUND_RESPONSE_CODE).send(config.responses.NOT_FOUND);
        }
    });
});

/**
 * GET a single venue route - HTTP GET method
 *
 * This route gets a single venue from the database, from the request parameter.
 *
 * Returns a single venue.
 */
router.get('/:venueName', function (req, res, next) {
    Venue.findOne({
        venueName: req.params.venueName
    }, function (err, venue) {
        handleErr(err, next);
        if (venue == null) {
            res.status(config.http.NOTFOUND_RESPONSE_CODE).send(config.responses.NOT_FOUND);
        } else {
            res.status(config.http.SUCCESS_RESPONSE_CODE).send(venue);
        }
    });
});

/**
 * DELETE a single venue route - HTTP DELETE method
 *
 * This route deletes a single venue from the database, from the selected request body.
 *
 * Returns a success message.
 */
router.delete('/', function (req, res, next) {
    Venue.remove({
        venueName: req.body.venueName
    }, function (err) {
        handleErr(err, next)
        res.status(config.http.SUCCESS_RESPONSE_CODE).send(config.responses.VENUE_DELETED_SUCCESS);
    })
});


/**
 * Get a list of results (max 10) from google places API.
 * Takes a type of venue and latlng location from user request and sends request to google servers
 * Handles error and if no response callback sent to post method
 * Attributes looped from google json result include:
 * - name of the venue
 * - address including postcode of the venue
 * - latitude and longitude of the venue
 *
 * Result sent back to route through a callback
 *
 * @param venueType - type of place
 * @param userLocation - location sent from user
 * @param callback - result
 */
function googleSearchRequest(venueType, userLocation, callback) {
    googleMapsClient.places({
            query: venueType,
            radius: config.google.SEARCH_RADIUS,
            location: userLocation
        },
        function (err, response) {
            console.log(response.json.results);
            handleErr(err);
            if (response.json.status == config.google.ZER0_RESULTS) {
                return callback(null);
            } else {
                var result = [];
                for (var loop = config.google.MIN_LOOP; loop < response.json.results.length; loop++) {
                    var obj = response.json.results[loop];
                    result.push({
                        name: obj.name,
                        formatted_address: obj.formatted_address,
                        lat: obj.geometry.location.lat,
                        lng: obj.geometry.location.lng
                    });
                }
            }
            return callback(result);
        })
};

/**
 * Validates a venue save request by checking if the name and address are not empty
 * and that the geo coordinates are float values.
 * Sends an error code if errors are found.
 * @param req user request
 * @param res user response
 * @param next invokes the next route handler
 */
function venueValidation(req, res, next) {
    req.check('venueName', 'Invalid name').notEmpty();
    req.check('venueAddress', 'Invalid address').notEmpty();
    req.check('venueLatitude', 'Invalid coordinates for latitude').isFloat();
    req.check('venueLongitude', 'Invalid coordinates for longitude').isFloat();
    var validationErrors = req.validationErrors(true);
    if (validationErrors) {
        res.status(config.http.BAD_RESPONSE_CODE).send(config.responses.BAD_VENUE_DETAILS);
    } else {
        next();
    }
}

/**
 * Validates a venue search request by checking if venuetype is not empty and that geo data are float values
 * Sends a HTTP 400 response to the the user if invalid else invokes next route handler
 *
 * @param req user request
 * @param res service response
 * @param next invokes the next route handler
 */
function googleValidation(req, res, next) {
    req.check('venueType', 'Error invalid venue type').notEmpty();
    req.check('latitude', 'Invalid coordinates for latitude').isFloat();
    req.check('longitude', 'Invalid coordinates for longitude').isFloat();
    var validationErrors = req.validationErrors(true);
    if (validationErrors) {
        res.status(config.http.BAD_RESPONSE_CODE).send(config.responses.BAD_VENUE_DETAILS);
    } else {
        next();
    }
}

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

// Object returns access to all routes when required by other node js files
module.exports = router;