/**
 *  Configuration file to setup valuable parameters such as host location, database location, API keys etc.
 *  TODO: attempt to seperate config into separate production and development branches
 */
var config = {
    server: {
        host: 'localhost',
        port: '54321' // port set on my local machine
    },
    database: {
        promise: 'global.Promise', // promises used for async compute, represents potential values
        port: 'mongodb://localhost/itineraryapp'
    },
    auth: {
        secret: 'penguinsrule'
    },
    morgan: {
        format: '| METHOD = :method. URL = :url. STATUS = :status. ' +
        'RESPONSE TIME = :response-time ms. DATE+TIME = :date[web].' // console format for API trace
    },
    google: {
        mapsKey: 'AIzaSyD1O213LeJYDURP4UISrgMKH6dnEAPHJnQ'
    }
};

// Object returns access to all routes when required by other node js files
module.exports = config;