// Import required modules for database ops with user model and routing with express.
var mongoose = require('mongoose'),
    Venue = require('../model/venue'),
    express = require('express'),
    router = express.Router(),
    config = require('../service/settings'),
    TWO_THOUSAND_METER_RADIUS = 2000,
    googleMapsClient = require('@google/maps').createClient({
        key: config.google.mapsKey
    });



// my address 54.570644, -5.922631
router.post('/search', venueValidation, function (req, res, next) {
    var venueType = req.body.venueType;
    var userLocation = req.body.latitude + ',' + req.body.longitude;
    googleSearchRequest(venueType, userLocation, function () {
        
    });
});


function handleErr(err) {
    if (err) return next(err);
}


function googleSearchRequest(venueType, userLocation, next) {
    googleMapsClient.places({
            query: venueType,
            radius: TWO_THOUSAND_METER_RADIUS,
            location: userLocation
        },
        function (err, res) {
            handleErr(err);
            if (res.json.results.length == null) {
                return false;
            } else {
                var results;
                for (var loop = 0; loop < res.json.results.length; loop++) {
                    console.log(res.json.results[loop]['name']);
                    console.log(res.json.results[loop]['formatted_address']);
                    console.log(res.json.results[loop]['geometry']['location']['lat']);
                    console.log(res.json.results[loop]['geometry']['location']['lng']);
                }
                results = {
                    name: res.json.results[loop]['name'],
                    address: res.json.results[loop]['formatted_address'],
                    latitude: res.json.results[loop]['lat'],
                    longtitude: res.json.results[loop]['lng']
                };
            }
            next(results);
        });
};

function venueValidation(req, res, next) {
    req.check('venueType', 'Error invalid venue type').notEmpty();
    req.check('venueLatitude', 'Invalid coordinates for lat').notEmpty();
    req.check('venueLongitude', 'Invalid coordinates for lng').notEmpty();
    var validationErrors = req.validationErrors(true);
    if (validationErrors) {
        res.status(config.http.BAD_RESPONSE_CODE).send(config.responses.BAD_VENUE_DETAILS);
        return;
    } else {
        next();
    }
}

module.exports = router;