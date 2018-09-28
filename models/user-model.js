const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    password: {
        type: String
    },
    verificationLink: {
        type: String
    },
    isVerified: {
        type: Boolean,
        default: false
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
        trim: true,
        lowercase: true
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
        type: String
    },
    fThumbnail: {
        type: String,
        default: '/images/defaultProfile/male.jpg'
    },
    isFThumnailDefault: {
        type: Boolean,
        default: true
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

userSchema.methods.generateHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(8));

userSchema.methods.validatePassword = (pass, hash) => bcrypt.compareSync(pass, hash);


var User = mongoose.model('user', userSchema);

module.exports = User;