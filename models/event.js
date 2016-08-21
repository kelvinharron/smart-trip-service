/**
 * Created by kelvinharron on 21/08/2016.
 */
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

/**

 SO WE ARE GOING TO BELFAST

 WE MAKE AN ITINERARY, we specify the name "trip to belfast" + the city "belfast"



 in this itinerary, we have EVENTS

 events have a name, "trip to the art gallery"

 events have a location "lat lng"

 EVENTS CAN ONLY BE CREATED IN AN INTINERARY

 they nest inside

 we capture the id of the newly created itinerary, and if that id doesn't exist we can't add events?

 **/