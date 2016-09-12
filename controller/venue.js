// Import required modules for database ops with user model and routing with express.
var mongoose = require('mongoose'),
    Venue = require('../model/venue'),
    express = require('express'),
    router = express.Router(),
    config = require('../service/settings'),
    TWO_THOUSAND_METER_RADIUS = 2000,
    googleMapsClient = require('@google/maps').createClient({
        key: config.google.key
    });

// my address 54.570644, -5.922631
router.post('/search', function (req, res, next) {
    var userLocation = req.body.latitude + ',' + req.body.longitude;
    googleSearchRequest(userLocation);
    res.status(200).json();
    next();
});

router.post('/')

function handleErr(err) {
    if (err) return next(err);
}


function googleSearchRequest(userLocation) {
    console.log("Searching for google places");
    googleMapsClient.places({
            query: 'cafe',
            radius: TWO_THOUSAND_METER_RADIUS,
            location: userLocation
        },
        function (err, res) {
            if (!err) {
                for (var loop = 0; loop < res.json.results.length; loop++) {
                    console.log(res.json.results[loop]['name']);
                    console.log(res.json.results[loop]['formatted_address'])
                    console.log(res.json.results[loop]['geometry']['location']['lat']);
                    console.log(res.json.results[loop]['geometry']['location']['lng']);
                }
            }
        });
};

module.exports = router;