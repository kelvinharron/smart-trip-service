/**
 *  model/user.js - model holds schema and encryption methods required by controller/user
 */

// Import required modules for database ops and validation
var mongoose = require('mongoose'),
    tripSchema = require('../model/trip'),
    Schema = mongoose.Schema,
    validate = require('mongoose-validate'),
    bcrypt = require('bcrypt'),
    config = require('../service/settings');

/**
 *  Creating a schema which is an object defining a MongoDB collection.
 *  Each 'key' is mapped to types and can have unique attributes for validation.
 */
var userSchema = new Schema({
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true,
        validate: [validate.email, 'invalid email address'] // TODO: does not seem to function correctly
    },
    password: {
        type: String,
        required: true,
        minlength: config.validation.MINIMUM_PASSWORD_LENGTH,
        maxlength: config.validation.MAXIMUM_PASSSWORD_LENGTH
    },
    userTrips: [tripSchema],
    // TODO: set to true once user signs up to allow offline mode???
    firstLogin: {
        type: Boolean,
        default: false,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    }
});

/**
 *  Pre method applied to before save function executed on userSchema.
 *
 *  bCrypt hashing applied. Using technique (1) as described by github page.
 *  Password is salted in one function and hashed in the next.
 *
 */
userSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(config.database.SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

/**
 * Comparator method used when a user attempts to login to an existing account.
 *
 * @param candidatePassword the password from the user login request
 * @param callback to next route, carry responses without crashing
 */
userSchema.methods.comparePassword = function (candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch);
    });
};

// Object returns access to schema for use in routing login and signup methods
module.exports = mongoose.model("User", userSchema);