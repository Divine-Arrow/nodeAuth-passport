const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    name: {
        type: String,
        trim: true
    },
    firstName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    gender: {
        type: String,
        trim: true
    },
    googleId: {
        type: String,
    },
    ageRange: Object,
    facebookId: {
        type: String,
    },
    birthdate: {
        type: String,
        trim: true
    },
    gThumbnail: {
        type: String,
    },
    fThumbnail: {
        type: String,
    },
    hometown: {
        type: String,
        trim: true
    },
    location: {
        type: String,
        trim: true
    }
});

var User = mongoose.model('user', userSchema);

module.exports = User;