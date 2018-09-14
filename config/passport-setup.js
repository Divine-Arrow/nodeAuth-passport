const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

const keys = require('./keys');
const User = require('../models/user-model');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user.id);
    });
});

passport.use(
    new GoogleStrategy({
        // option for google strategy
        callbackURL: '/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, (accessToken, refreshToken, data, done) => {

        // find user
        User.findOne({googleId: data.id}).then((currentUser) => {

            if (currentUser) {
                console.log('User already exist');
                done(null, currentUser);
            } else {
                
                const newUser = new User({
                    userName: data.displayName,
                    googleId: data.id
                });
                newUser.save().then((userData) => {
                    
                    console.log('**************\nSUCCESSFULLY GOT\n', userData);
                    done(null, userData);
                }, (e) => {
                    console.log('something went wrong');
                });
            }

        });

    })
);