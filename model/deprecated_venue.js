/**
 *  model/venue.js - model holds schema and encryption methods required by controller/venue for areas of interest
 *  that a user would add to their trip.
 */

var mongoose = require('mongoose'),
    tripSchema = require('deprecreated_trip'),
    Schema = mongoose.Schema,
    config = require('../service/settings'),
    validate = require('mongoose-validate');


var venueSchema = new Schema({
    venueName: {
        type: String,
        required: true
    },
    venueAddress: {
        type: String,
        required: true
    },
    venueLatitude: {
        type: String,
        required: true
    },
    venueLongitude: {
        type: String,
        required: true
    },
    savedToTrip: [tripSchema],
    dateCreated: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Venue', venueSchema);
