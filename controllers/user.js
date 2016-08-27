var mongoose = require('mongoose'),
    User = require('../models/user'),
    express = require('express'),
    router = express.Router();

function handleErr(err) {
    if (err) {
        return next(err);
    }
}

router.get('/', function (req, res) {
    console.log("GET USER");
    User.find({}).exec(function (err, itinerary) {
        handleErr(err);
        console.log(itinerary);
        if (itinerary.length == 0) {
            console.log("not found")
        } else {
            res.json(itinerary);
        }
    })
});

module.exports = router;