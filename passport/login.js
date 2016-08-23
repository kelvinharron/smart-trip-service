var localStrategy = require('passport-local'.Strategy);
var user = require('../models/user');
var bCrypt = require('bcrypt-nodejs');

module.exports = function (passport) {
    passport.use('login', new localStrategy({
            passReqToCallback: true
        },
        function (req, username, password, done) {
            // check in db if username exists
            User.findOne({'username': username},
                function (err, user) {
                    // in case of error, return use done method
                    if (err) {
                        return done(err);
                    }
                    // username does not exist, log error and redirect
                    if (!user) {
                        console.log('User not found with username' + username);
                        return done(null, false,
                            req.flash('message', 'User not found'));
                    }
                    // user exists, wrong password so error logged
                    if (!isValidPassword(user, password)) {
                        console.log('Invalid password');
                        return done(null, false,
                            req.flash('message', 'Invalid password'));
                    }
                    // username and password match, return user from done method = success!
                    return done(null, user);
                }
            );
        })
    );

    var isValidPassword = function (user, password) {
        return bCrypt.compareSync(password, user.password);
    }
}

