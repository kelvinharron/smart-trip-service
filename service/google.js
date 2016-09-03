var googleMapsClient = require('@google/maps').createClient({
    key: config.google_maps_key
});

// belfast: 54.604207, -5.932132

googleMapsClient.places({
    query: "art",
    location: "54.604207, -5.932132"
}, function (err, res) {

    if (!err) {
        console.log(res.json)
        console.log(res.json.results[0]['name']);
        console.log(res.json.results[0]['types'][0]);
        console.log(res.json.results[0]['formatted_address']);
        console.log(res.json.results[0]['geometry']['location']['lat']);
        console.log(res.json.results[0]['geometry']['location']['lng']);
    }
});