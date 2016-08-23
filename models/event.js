var mongoose = require('mongoose');

var eventSchema = mongoose.Schema({
    eventName: {
        type: String,
        required: true
    },
    eventLocation: {
        type: {},
        coordinates: [Number]
    }
})

var Event = module.exports = mongoose.model('Event', eventSchema);
