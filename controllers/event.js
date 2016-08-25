var Event = require('../models/event');
var googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyCgrqJvbZQyT6WqOzu4UI7hWA4i0qpNo3U'
});

function handleErr(err) {
    if (err) {
        return next(err);
    }
}

// get all itinerarys
exports.getAllEvents = function (req, res) {
    Event.find(function (err, event) {
        handleErr(err);
        if (event.length == 0) {
            console.log("No events to display")
        } else {
            res.json(event);
        }
    });
}

// creating a new itinerary
exports.createEvent = function (req, res) {
    var event = new Event({
        eventName: req.body.tripName,
        eventLocation: req.body.tripCity
    });
    event.save(function (err) {
        handleErr(err);
        return res.send(event);
    });
}


// deleting an itinerary
exports.deleteEvent = function (req, res) {
    Event.remove({_id: req.params._id}, function (err) {
        handleErr(err);
        res.json({message: "Event was deleted"})
    });
}