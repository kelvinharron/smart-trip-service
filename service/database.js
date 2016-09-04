var mongoose = require('mongoose'),
    config = require('../service/settings');

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
}

module.exports = establishDatabaseConnection();


