/**
 *  model/trip.js - model holds schema required by controller/trip for creating a list/itinerary of venues.
 */

// Import required modules for database ops and validation
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var tripSchema = new Schema({
    tripName: {
        type: String,
        required: true,
        default: "My trip"
    },
    tripCity: {
        type: String,
        required: true
    },
    venues: {
        type: Array,
        ref: 'Venue'
    },
    startDate: {
        type: Date,
        default: Date.now()
    },
    endDate: {
        type: Date
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("Trip", tripSchema);