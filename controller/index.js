var express = require('express'),
    jwt = require('express-jwt'),
    router = express.Router();

/**
 * Unsuccessful attempt to fortify all routes with the javascript web token auth method
 * Idea is to fortify all routes except signup/login with stateless token system.
 * Integrates into express middleware, should stack on middleware layer as auth
 *
 *  TODO: Introduce module and test
 */
var jwtCheck = jwt({
    secret: new Buffer('penguinsrule', 'base64'),
    audience: ''
});

/* list of current route controller */
router.use('/api/user', require('./user'));
router.use('/api/venue', require('./venue'));
router.use('/api/trip', require('./trip'));

/* display home page */
router.get('/status', function (req, res) {
    res.json({message: "Server online"})
});

module.exports = router;