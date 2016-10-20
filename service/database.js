/**
 *  database.js - database service class
 */
var pg = require('pg'),
    config = require('../service/settings');

function setupDatabase() {
    pg.connect(config.database.address, onConnect);
    console.log("Connected to Database at " + config.database.address);
}

function onConnect(err, client, done) {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    client.end();
}


module.exports = setupDatabase();