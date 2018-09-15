const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

const keys = require('./keys');
const User = require('../models/user-model');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        if(user){
            return done(null, user);
        }
        done(null, null);
    })
});



passport.use(
    new GoogleStrategy({
        // option for google strategy
        callbackURL: '/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, (accessToken, refreshToken, data, done) => {
        // console.log(JSON.stringify(data, undefined,2));
        // find user
        User.findOne({googleId: data.id}).then((currentUser) => {
            if (currentUser) {
                done(null, currentUser);
            } else {
                const newUser = new User({
                    userName: data.displayName,
                    googleId: data.id,
                    gImageUrl: data._json.image.url
                });
                newUser.save().then((userData) => {
                    done(null, userData);
                }, (e) => {
                    console.log('something went wrong');
                });
            }

        });

    })
);





