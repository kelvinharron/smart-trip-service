var express = require('express'),
    jwt = require('express-jwt'),
    router = express.Router();

//var jwtCheck = jwt({
    //secret: new Buffer(auth.secret, 'base64'),
  //  audience: ''
//});

/* list of current route controller */
router.use('/api/venue', require('./venue'));
router.use('/api/itinerary', require('./trip'));
router.use('/api/user', require('./user'));

/* display home page */
router.get('/status', function (req, res) {
    res.json({message: "Server online"})
});


module.exports = router;