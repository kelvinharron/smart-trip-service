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
