const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    name: {
        type: String,
        default: 'none',
        trim: true
    },
    firstName: {
        type: String,
        default: 'none',
        trim: true
    },
    lastName: {
        type: String,
        default: 'none',
        trim: true
    },
    gender: {
        type: String,
        default: 'none',
        trim: true
    },
    googleId: {
        type: String,
        default: 'none'
    },
    ageRange: Object,
    facebookId: {
        type: String,
        default: 'none'
    },
    birthdate: {
        type: String,
        default: 'none',
        trim: true
    },
    gThumbnail: {
        type: String,
        default: 'none'
    },
    fThumbnail: {
        type: String,
        default: 'none'
    },
    hometown: {
        type: String,
        default: 'none',
        trim: true
    },
    location: {
        type: String,
        default: 'none',
        trim: true
    }
});

var User = mongoose.model('user', userSchema);

module.exports = User;