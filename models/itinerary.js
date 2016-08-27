var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var itinerarySchema = new Schema({
    tripName: {
        type: String,
        required: true

    },
    tripCity: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("Itinerary", itinerarySchema);

