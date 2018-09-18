const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    name: String,
    firstName: String,
    lastName: String,
    gender: String,
    googleId: String,
    ageRange: Object,
    facebookId: String,
    birthdate: String,
    gThumbnail: String,
    fThumbnail: String,
    hometown: String,
    location: String
});

var User = mongoose.model('user', userSchema);

module.exports = User;
