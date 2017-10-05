const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://credwa:Rogere12@ds161574.mlab.com:61574/todoappdb');

module.exports = {
    mongoose
};