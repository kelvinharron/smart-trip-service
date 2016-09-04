// Import required modules for database ops with user model and routing with express.
var mongoose = require('mongoose'),
    User = require('../model/user'),
    express = require('express'),
    router = express.Router();

/**
 *  Signup route - HTTP POST method
 *  url accessed by app = api/user/signup
 *
 *  Takes userValidation function in argument which is performed when route is accessed.
 *  First we use the email provided in the request body to check if that email has already been used.
 *  If it has, we return a status 409 to the user as emails must be unique.
 *  If it has not been used, we create a new user with the email and password from the request body.
 *  and save the new user to the mongo database. Password encryption applied before saving.
 */
router.post('/signup', userValidation, function (req, res, next) {
    User.findOne({'email': req.body.email}, function (err, user) {
        handleErr(err, next);
        console.log("Now checking if email is unique");
        if (user) {
            console.log("Email already in use");
            res.status(409).json();
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

/**
 *  Login route - HTTP POST method
 *  url accessed by app = api/user/login
 *
 *  Takes userValidation function in argument which is performed when route accessed.
 *  First we search for a user with the request body email sent and handle any errors that might occur.
 *  If the user email is not found, return a 400 to the user.
 *  If the user IS FOUND, we compare the password in the request body with the hashed password in the database.
 *  If the password is correct, return a 200 success to the user which authenticates login.
 *  If the password is incorrect, return a 400 to the user.
 */
router.post('/login', userValidation, function (req, res, next) {
    User.findOne({email: req.body.email}, function (err, user) {
        handleErr(err, next);
        console.log("Checking if email exists in database");
        if (!user) {
            console.log("email not found");
            res.status(400).json();
        } else {
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (err) throw err;
                if (req.body.password && isMatch == true) {
                    req.session.user = user;
                    res.status(200).send();
                } else {
                    res.status(400).send();
                }
            })
        }
    })
});

/**
 *
 * Simple error handler function that slightly improves code readability in the api routes.
 *
 * @param err thrown by service
 * @param next return error without crashing service
 * @returns {*}
 */
function handleErr(err, next) {
    if (err) return next(err);
}

/**
 * Validates user login and signup requests by checking if email & password is valid using ExpressValidator
 * Sends a HTTP 400 response to the user if invalid else invokes next route handler
 *
 * @param req user request
 * @param res service response
 * @param next invokes the next route handler
 */
function userValidation(req, res, next) {
    console.log("Validating email and password request");
    req.check('email', 'Invalid Email').isEmail();
    req.check('password', 'Invalid Password ! Must be at least 10 characters').len(10, 64);
    var validationErrors = req.validationErrors(true);
    if (validationErrors) {
        console.log(validationErrors);
        res.status(400).json();
    } else {
        console.log("Looks good, next step");
        next();
    }
};

/**
 * NOT USED IN APP
 * prototype route, only allows user access if first logged in.
 */
router.get('/dashboard', function (req, res) {
    if (!req.session.user) {
        res.status(401).send(); // unauthorised
    }
    res.status(200).send("Log in SUCCESS");
});

// Object returns access to all routes when required by other node js files
module.exports = router;