const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const facebookStrategy = require('passport-facebook');

const keys = require('./keys');
const User = require('../models/user-model');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        if (user) {
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
        clientSecret: keys.google.clientSecret,
        failureRedirect: '/login',
    }, (accessToken, refreshToken, data, done) => {
        // console.log(JSON.stringify(data, undefined,2));
        // find user
        User.findOne({
            googleId: data.id
        }).then((currentUser) => {
            if (currentUser) {
                done(null, currentUser);
            } else {
                const newUser = new User({
                    name: data.displayName,
                    googleId: data.id,
                    gThumbnail: data._json.image.url,
                    email: data._json.emails[0].value
                });
                newUser.save().then((userData) => {
                    done(null, userData);
                }, (e) => {
                    console.log('something went wrong');
                });
            }

        });
    }));


passport.use(new facebookStrategy({
    callbackURL: "/auth/facebook/redirect",
    clientID: keys.facebook.clientID,
    clientSecret: keys.facebook.clientSecret,
    failureRedirect: '/login',
    profileFields: ['hometown', 'location', 'picture.height(480)', 'name', 'displayName', 'birthday', 'gender', 'email', 'age_range'],
    // https://developers.facebook.com/docs/facebook-login/permissions/
}, (accessToken, refreshToken, profile, done) => {
    // console.log(profile);
    User.findOne({
        email: profile._json.email
    }).then((currentUser) => {
        if (currentUser) {
            done(null, currentUser);
        } else {
            const newUser = new User({
                name: profile._json.name,
                firstName: profile._json.first_name,
                lastName: profile._json.last_name,
                gender: profile._json.gender,
                email: profile._json.email,
                ageRange: profile._json.age_range,
                facebookId: profile._json.id,
                fThumbnail: profile._json.picture.data.url,
                birthdate: profile._json.birthday,
                hometown: profile._json.hometown.name,
                location: profile._json.location.name
            });
            newUser.save().then((userData) => {
                if (userData) {
                    done(null, userData);
                }
            });
        }

    }, (e) => done(e));
}));