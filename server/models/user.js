const mongoose = require('mongoose');

let User = mongoose.model('User', {
    email: {
        type: String,
        default: false,
        required: true,
        trim: true,
        minlength: 1
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    }
});

module.exports = {
    User
};