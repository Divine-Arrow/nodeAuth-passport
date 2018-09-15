const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: String,
    googleId: String,
    gImageUrl: String
});

var User = mongoose.model('user', userSchema);

module.exports = User;