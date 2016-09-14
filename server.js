/**
 *  server.js - entry point to our application where we start up our server, database and middleware connections.
 *
 *  Node is based on a module loading system where modules are imported to grant specific functionality.
 *  If we need to load one module multiple times we do not sustain a performance hit as modules are cached after 1st load.
 *
 *  The modules being used include:
 *  @param express: middleware application framework that will be used extensively for setting up API routes
 *  @param app: creates express object allowing us to add middleware stacks
 *  @param session: creates a user session state that we can monitor for authentication
 *  @param bodyParser: enables us to parse json and urlencoded request bodies, so we can use the info in them
 *  @param expressValidator: enables us to validate request body data for errors such as bad email formats
 *  @param database: exported function that handles the database connect/error/disconnect processes
 *  @param morgan: logger that stacks into express middleware, logs requests and responses to the server to console
 *  @param config: storage for our ports, addresses, api keys etc
 */
var express = require('express'),
    app = express(),
    session = require('express-session'), // TODO: build session module with JWT functionality
    bodyParser = require('body-parser'),
    expressValidator = require('express-validator'),
    database = require('./service/database'),
    morgan = require('morgan'),
    config = require('./service/settings');

// The following section of code configures our middleware and adds them to the express stack
app.use(morgan(config.morgan.format));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false})); // **USED FOR POSTMAN API TESTING ONLY**
app.use(expressValidator({
    customValidators: {
        isGeo: function (value) {
            return Geo.isGeo(value);
        },
    }
}));
app.use(session({secret: config.auth.secret, resave: false, saveUninitialized: true}));
app.use(require('./controller'));

// log error with startup
app.on('error', function (err) {
    console.log("Error starting server middleware:");
    console.log(err);
});

// Start point of the application
app.listen(config.server.port, function () {
    console.log("Server running on http://localhost:" + config.server.port);
});