const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: String,
    googleId: String,
    thumbnail: String,
    email: {
        type: String,
        unique: true
    }
});

var User = mongoose.model('user', userSchema);

module.exports = User;