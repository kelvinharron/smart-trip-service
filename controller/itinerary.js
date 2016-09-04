var mongoose = require('mongoose'),
    Itinerary = require('../model/itinerary'),
    express = require('express'),
    router = express.Router();

function handleErr(err, next) {
    if (err) {
        return next(err);
    }
}
router.get('/', function (req, res, next) {
    Itinerary.find({}).lean().exec(function (err, itinerary) {
        handleErr(err, next);
        if (itinerary.length == 0) {
            console.log("not found")
        } else {
            res.json(itinerary);
        }
    })
});

router.get('/:_id', function (req, res, next) {
    Itinerary.findById(req.params._id, function (err, itinerary) {
        handleErr(err, next);
        if (itinerary == null) {
            console.log("not found");
        } else {
            res.json(itinerary);
        }
    })
});

router.post('/', function (req, res, next) {
    var itinerary = new Itinerary({
        tripName: req.body.tripName,
        tripCity: req.body.tripCity
    });
    itinerary.save(function (err) {
        handleErr(err, next);

        return res.json(itinerary);
    })
});

router.put('/:_id', function (req, res, next) {
    Itinerary.update({_id: req.params._id}, {
        tripName: req.body.tripName,
        tripCity: req.body.tripCity,
        dateCreated: Date.now()
    }, function (err, itinerary) {
        handleErr(err, next);
        res.json(itinerary);
    })
});

router.delete('/:_id', function (req, res, next) {
    Itinerary.remove({_id: req.params._id}, function (err) {
        handleErr(err, next);
        res.json({message: "Itinerary removed"})
    })
});

module.exports = router;