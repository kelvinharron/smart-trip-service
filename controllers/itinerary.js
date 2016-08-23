var Itinerary = require('../models/itinerary');
var googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyCgrqJvbZQyT6WqOzu4UI7hWA4i0qpNo3U'
});

function handleErr(err) {
    if (err) {
        return next(err);
    }
}

// get all itinerarys
exports.getAllItinerarys = function (req, res) {
    console.log("GET: ALL");
    Itinerary.find(function (err, itinerary) {
        handleErr(err);
        if (itinerary.length == 0) {
            console.log("No itinerarys to display")
        } else {
            res.json(itinerary);
        }
    });
}

// get a single itinerary based on Id
exports.getItinerary = function (req, res, next) {
    console.log("GET: SINGLE");

    Itinerary.find({_id: req.params._id}, function (err, itinerary) {
        handleErr(err);
        if (itinerary == null) {
            console.log("No itinerarys to display")
        } else {
            res.json(itinerary);
        }
    });
}

// creating a new itinerary
exports.createItinerary = function (req, res, next) {
    console.log("POST: ");
    var itinerary = new Itinerary({
        tripName: req.body.tripName,
        tripCity: googleMapsClient.place()
    });
    itinerary.save(function (err) {
        handleErr(err);
        return res.send(itinerary);
    });
}

// updating an itinerary
exports.updateItinerary = function (req, res, next) {
    console.log("PUT: " + req.body._id);
    Itinerary.update({_id: req.params._id}, {
        tripName: req.body.tripName,
        tripCity: req.body.tripCity,
        startDate: Date.now(),
        endDate: Date.now()
    }, function (err, itinerary) {
        handleErr(err);
        res.json(itinerary);
    });
}

// deleting an itinerary
exports.deleteItinerary = function (req, res, next) {
    console.log("DELETE: " + req.body._id);
    Itinerary.remove({_id: req.params._id}, function (err) {
        handleErr(err);
        res.json({message: "Itinerary was deleted"})
    });
}