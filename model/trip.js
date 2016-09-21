/**
 *  model/trip.js - model holds schema required by controller/trip for creating a list/itinerary of venues.
 */

var mongoose = require('mongoose'),
    userSchema = require('../model/user'),
    venueSchema = require('../model/venue'),
    Schema = mongoose.Schema;

var tripSchema = new Schema({
    tripName: {
        type: String,
        required: true,
        default: "My First Trip"
    },
    tripCity: {
        type: String,
        required: true,
        default: "Belfast, United Kingdom"
    },
    startDate: {
        type: String
    },
    endDate: {
        type: String
    },
    tripAuthor: [userSchema],
    tripVenues: [venueSchema],
    dateCreated: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("Trip", tripSchema);

