var mongoose = require('mongoose'),
    User = require('../models/user'),
    express = require('express'),
    router = express.Router();


function handleErr(err, next) {
    if (err) return next(err);
}

function validator(req, res, next) {
    console.log("Validating email and password request");
    req.check('email', 'Invalid Email').isEmail();
    req.check('password', 'Invalid Password ! Must be at least 8 alphanumeric').len(10, 100);
    req.check('password', 'Invalid Password ! Must be alphanumeric').isAlphanumeric();
    var errors = req.validationErrors(true);
    if (errors) {
        console.log(errors)
        res.status(400).json();
    } else {
        console.log("Looks good, next");
        next();
    }
};

// Create a new user
router.post('/register', validator, function (req, res, next) {
    User.findOne({'email': req.body.email}, function (err, user) {
        handleErr(err, next);
        console.log("Now checking if email is unique");
        if (user) {
            console.log("Email already in use");
            res.status(409).json();
            return
        } else {
            console.log("Create a new user!");
            var newUser = new User();
            newUser.email = req.body.email;
            newUser.password = req.body.password;
            newUser.save(function (err) {
                handleErr(err, next);
                res.json(200);

            })
        }
    })
});

// authenticate is creating a token, so we post
router.post('/login', validator, function (req, res, next) {
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