var mongoose = require('mongoose'),
    User = require('../models/user'),
    express = require('express'),
    jwt = require('jsonwebtoken'),
    router = express.Router();

function handleErr(err, next) {
    if (err) return next(err);
}
// create a user
router.post('/register', function (req, res, next) {
    var email = req.body.email
    var password = req.body.password;
    var newUser = new User();
    newUser.email = email;
    newUser.password = password;
    newUser.save(function (err, user) {
        handleErr(err, next);
        return res.status(200).send();
    })
});

// create a user session
router.get('/dashboard', function (req, res) {
    if (!req.session.user) {
        return res.status(401).send(); // unauthorised
    }
    return res.status(200).send("Log in SUCCESS");
});

// authenticate is creating a token, so we post
router.post('/login', function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({email: email}, function (err, user) {
        handleErr(err, next);
        if (!user) {
            return res.status(404).send();
        }
        user.comparePassword(password, function (err, isMatch) {
            if (isMatch && isMatch == true) {
                var token = jwt.sign(user, app.get(config.SECRET), {expiresInMinutes: 1440});
                req.session.user = user;
                return res.status(200).send();
            } else {
                return res.status(401).send();
            }
        })
    })
});

router.get('/', function (req, res) {
    console.log("GET USER");
    User.find({}).exec(function (err, itinerary) {
        handleErr(err);
        console.log(itinerary);
        if (itinerary.length == 0) {
            console.log("not found")
        } else {
            res.json(itinerary);
        }
    })
});

module.exports = router;