var mongoose = require('mongoose'),
    User = require('../models/user'),
    validator = require('express-validator'),
    express = require('express'),
    router = express.Router();


function handleErr(err, next) {
    if (err) return next(err);
}


// Create a new user
router.post('/register', function (req, res, next) {
    User.findOne({'email': req.body.email}.exec, function (err, user) {
        handleErr(err, next);
        console.log("Checking if email unique:" + user)
        if (user) {
            console.log("USER ALREADY IN DB");
            res.json(409, {err: 'Email already in use'});
            return true
        } else {
            console.log("CREATE NEW USER")
            var email = req.body.email
            var password = req.body.password;
            var newUser = new User();
            newUser.email = email;
            newUser.password = password;
            newUser.save(function (err) {
                handleErr(err, next);
                res.json(200);
            })
        }
    })
});

// authenticate is creating a token, so we post
router.post('/login', function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({email: email, password: password}, function (err, user) {
        handleErr(err, next);
        if (!user) {
            return res.status(404).send();
        }
        user.comparePassword(password, function (err, isMatch) {
            if (isMatch && isMatch == true) {
                req.session.user = user;
                return res.status(200).send();
            } else {
                return res.status(401).send();
            }
        })
    })
});

// prove the user is logged in
router.get('/dashboard', function (req, res) {
    if (!req.session.user) {
        return res.status(401).send(); // unauthorised
    }
    return res.status(200).send("Log in SUCCESS");
});


module.exports = router;