/**
 *  model/venue.js - model holds schema and encryption methods required by controller/venue for areas of interest
 *  that a user would add to their trip.
 */

var mongoose = require('mongoose'),
    userSchema = require('../model/user'),
    Schema = mongoose.Schema,
    config = require('../service/settings'),
    validate = require('mongoose-validate');


var venueSchema = new Schema({
    venueName: {
        type: String
    },
    venueAddress: {
        type: String
    },
    venueLatitude: {
        type: String
    },
    venueLongitude: {
        type: String
    },
    createdByTrip: [userSchema],
    dateCreated: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Venue', venueSchema);
