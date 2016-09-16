// Import required modules for database ops with user model and routing with express.
var mongoose = require('mongoose'),
    Venue = require('../model/venue'),
    express = require('express'),
    router = express.Router(),
    config = require('../service/settings'),
    googleMapsClient = require('@google/maps').createClient({
        key: config.google.mapsKey
    });

router.post('/search', venueValidation, function (req, res, next) {
    var venueType = req.body.venueType;
    var userLocation = req.body.latitude + ',' + req.body.longitude;

    googleSearchRequest(venueType, userLocation, function (result) {
        console.log(result)
        if (result === null) {
            res.status(config.http.NOTFOUND_RESPONSE_CODE).send(config.responses.NO_VENUES_FOUND);
        }
        var json = result;
        res.status(config.http.SUCCESS_RESPONSE_CODE).send(json);
    });
});

router.post('/', function (req, res, next) {
    var venueType = req.body.venueType;
    var userLocation = req.body.latitude + ',' + req.body.longitude;

    googleSearchRequest(venueType, userLocation, function (result) {
        console.log("hello result")
        if(result === null) {
            res.status(config.http.NOTFOUND_RESPONSE_CODE).send("OOPS")
        }
        var json = result
        res.status(config.http.SUCCESS_RESPONSE_CODE).send(json)
    })
})

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
            handleErr(err);
            if (response.json.results.length == null) {
                return callback(null);
            } else {
                var result = [];
                for (var loop = config.google.MIN_LOOP; loop <= config.google.MAX_LOOP; loop++) {
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
 * Validates a venue search request by checking if venuename is not empty and that geo data are float values
 * Sends a HTTP 400 response to the the user if invalid else invokes next route handler
 *
 * @param req user request
 * @param res service response
 * @param next invokes the next route handler
 */
function venueValidation(req, res, next) {
    req.check('venueType', 'Error invalid venue type').notEmpty();
    req.check('latitude', 'Invalid coordinates for lat').isFloat();
    req.check('longitude', 'Invalid coordinates for lng').isFloat();
    var validationErrors = req.validationErrors(true);
    if (validationErrors) {
        console.log("VALIDATION ERROR")
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
function handleErr(err) {
    if (err) return next(err);
}

// Object returns access to all routes when required by other node js files
module.exports = router;