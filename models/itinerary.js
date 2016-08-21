var mongoose = require('mongoose');

var itinerarySchema = mongoose.Schema({
    tripName: {
        type: String,
        required: true
    },
    tripCity: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        default: Date.now()
    },
    endDate: {
        type: Date,
        default: Date.now()
    }
});

var Itinerary = module.exports = mongoose.model("Itinerary", itinerarySchema);