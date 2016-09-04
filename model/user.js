var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    validate = require('mongoose-validate')
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

var userSchema = new Schema({
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true,
        validate: [validate.email, 'invalid email address']
    },
    password: {
        type: String,
        required: true
    },
    firstLogin: {
        type: Boolean,
        default: false,
        required: true
    }
});

// just before save function in mongoose
userSchema.pre('save', function (next) {
    var user = this;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        })
    })
});

userSchema.methods.comparePassword = function (candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch);
    })
};

module.exports = mongoose.model("User", userSchema);