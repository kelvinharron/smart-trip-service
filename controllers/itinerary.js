var mongoose = require('mongoose'),
    Itinerary = require('../models/itinerary'),
    express = require('express'),
    router = express.Router();

function handleErr(err, next) {
    if (err) {
        return next(err);
    }
}

router.get('/', function (req, res, next) {
    console.log("GET ALL ITINERARYS");
    Itinerary.find({}).exec(function (err, itinerary) {
        handleErr(err);
        console.log(itinerary);
        if (itinerary.length == 0) {
            console.log("not found")
        } else {
            res.json(itinerary);
        }
    })
});

router.get('/:_id', function (req, res, next) {
    Itinerary.findById(req.params._id, function (err, itinerary) {
        handleErr(err);
        if (itinerary == null) {
            console.log("not found");
        } else {
            res.json(itinerary);
        }
    })
});

router.post('/', function (req, res, next) {
    console.log("NEW ITINERARY");
    var itinerary = new Itinerary({
        tripName: req.body.tripName,
        tripCity: req.body.tripCity
    });
    itinerary.save(function (err) {
        handleErr(err);
        return res.json(itinerary);
    })
});

router.put('/:_id', function (req, res, next) {
    console.log("UPDATING ITINERARY");
    Itinerary.update({_id: req.params._id}, {
        tripName: req.body.tripName,
        tripCity: req.body.tripCity,
        dateCreated: Date.now()
    }, function (err, itinerary) {
        handleErr(err);
        res.json(itinerary);
    })
});

router.delete('/:_id', function (req, res, next) {
    console.log("REMOVING ITINERARY");
    Itinerary.remove({_id: req.params._id}, function (err) {
        handleErr(err);
        res.json({message: "Itinerary removed"})
    })
});

module.exports = router;