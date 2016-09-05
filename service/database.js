/**
 *  service/database.js - Used to setup a connection to the mongoDB noSQL database that is used by the service
 *  for persistent storage.
 *
 *  Closes connection on service termination.
 */

var mongoose = require('mongoose'),
    config = require('../service/settings');

/**
 * Exported function that handles the various stages of the database,
 * from the connection to the database port
 * to any errors that might result of attempting to connect (not running database locally)
 * to informing us of a successful disconnect once the service terminates.
 *
 * By exporting the actual function instead of just the module, we do not need to implement it in the app.js
 * only require it as part of our list of modules for it to correctly function.
 */
function establishDatabaseConnection() {
// Establish a connection to our database
    mongoose.connect(config.database.port);

// For when the connection is succesfully established
    mongoose.connection.on('connected', function () {
        console.log('Mongoose connection established to ' + config.database.port);
    });

// For if the connection throws up an error
    mongoose.connection.on('error', function (err) {
        console.error('ERROR: Mongoose connection issue ' + err);
    });

// For when the connection is disconnected
    mongoose.connection.on('disconnected', function () {
        console.log('Mongoose disconnected');
    });

// If the service terminates, close the connection to our database
    process.on('SIGINT', function () {
        mongoose.connection.close(function () {
            console.log("Mongoose disconnected due to service termination");
            process.exit(0);
        });
    });
};

// Object returns access to all routes when required by other node js files
module.exports = establishDatabaseConnection();