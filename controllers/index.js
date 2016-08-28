var express = require('express'),
    router = express.Router();

/* list of current route controllers */
router.use('/api/itinerary', require('./itinerary'));
router.use('/api/user', require('./user'));

/* display home page */
router.get('/', function (req, res) {
    res.send("This is the home page, you shouldn't be able to see this");
});


module.exports = router;