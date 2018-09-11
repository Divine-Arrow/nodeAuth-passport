const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

const keys = require('./keys');
const User = require('../models/user-model');

/* passport.use(
    new GoogleStrategy({
        // option for google strategy
        callbackURL: '/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, (accessToken, refreshToken, data, done) => {
        const newUser = new User({
            userName: data.displayName,
            googleId: data.id
        });
        newUser.save().then((userData) => {
            
            // console.log('**************\nSUCCESSFULLY GOT\n', userData);
        }).catch((e)=> {
            console.log('something went wrong');
            
        });

    })
); */
