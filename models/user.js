var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: Date,
        default: Date.now()
    }
});

var User = module.exports = mongoose.model("User", userSchema);