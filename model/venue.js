/**
 *  model/venue.js - model holds schema and encryption methods required by controller/venue for areas of interest
 *  that a user would add to their trip.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    validate = require('mongoose-validate');


var venueSchema = new Schema({
    venueName: String,
    venueType: [],
    venueAddress: String,
    venueLatitude: String,
    venueLongitude: String
});

module.exports = mongoose.model('Event', venueSchema);
