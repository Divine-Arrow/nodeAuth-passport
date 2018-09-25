const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const FacebookStrategy = require('passport-facebook');
const LocalStrategy = require('passport-local');

var keys;
try {
    if(require('./config/keys')) {
        keys = require('./config/keys');
    };
}catch(e) {
    keys = require('./config/herokuKeys') 
};
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

passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    (req, email, password, done) => {
        process.nextTick(() => {
            User.findOne({
                email
            }).then((foundedUser) => {
                if (foundedUser) {
                    return done(null, false);
                }
                var newUser = new User(req.body);
                newUser.password = newUser.generateHash(password);
                newUser.save().then((savedUser) => {
                    if (!savedUser) {
                        return done(err)
                    }
                    return done(null, savedUser);
                });
            }).catch((e) => {
                if (e) {
                    done(e);
                }
            });
        })
    }));

passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    (req, email, password, done) => {
        User.findOne({
            email
        }).then((foundedUser) => {
            if (!foundedUser)
                return done(null, false);
            if (!foundedUser.validPassword(password)) {
                console.log(foundedUser.validPassword(password));
                return done(null, false);
            }
            return done(null, foundedUser);
        }).catch((e) => {
            if (e) {
                done(e);
            }
        });
    }));

passport.use(new GoogleStrategy({
    // option for google strategy
    callbackURL: '/auth/google/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    failureRedirect: '/login',
}, (accessToken, refreshToken, profile, done) => {
    // console.log(JSON.stringify(profile, undefined,2));
    // find user
    User.findOne({
        email: profile._json.emails[0].value
    }).then((currentUser) => {
        if (currentUser) {
            done(null, currentUser);
        } else {
            const newUser = new User({
                firstName: profile._json.name.givenName,
                lastName: profile._json.name.familyName,
                gender: profile._json.gender,
                googleId: profile.id,
                gThumbnail: `${profile._json.image.url.split('?sz')[0]}?sz=480`,
                email: profile._json.emails[0].value
            });
            newUser.save().then((userData) => {
                done(null, userData);
            }, (e) => {
                console.log('something went wrong\n', e);
            });
        }

    });
}));


passport.use(new FacebookStrategy({
    callbackURL: "/auth/facebook/redirect",
    clientID: keys.facebook.clientID,
    clientSecret: keys.facebook.clientSecret,
    failureRedirect: '/login',
    profileFields: ['hometown', 'location', 'picture.height(480)', 'name', 'displayName', 'birthday', 'gender', 'email', 'age_range'],
    // https://developers.facebook.com/docs/facebook-login/permissions/
}, (accessToken, refreshToken, profile, done) => {
    // console.log(profile);
    User.findOne({
        facebookId: profile._json.id,
    }).then((currentUser) => {
        if (currentUser) {
            done(null, currentUser);
        } else {
            const modelData = {
                firstName: profile._json.first_name,
                lastName: profile._json.last_name,
                gender: profile._json.gender,
                email: profile._json.email,
                ageRange: profile._json.age_range,
                facebookId: profile._json.id,
                fThumbnail: profile._json.picture.data.url,
                isFThumnailDefault: true,
                birthdate: profile._json.birthday,
                hometown: profile._json.hometown.name,
                location: profile._json.location.name
            }
            User.findOne({
                email: profile._json.email
            }).then((existingEmail) => {
                if (existingEmail) {
                    User.updateOne({
                        $set: modelData
                    }).then((updateStatus) => {
                        if (updateStatus.n > 0) {
                            User.findOne({
                                facebookId: profile._json.id,
                            }).then((updatedUser) => {
                                if (updatedUser) {
                                    done(null, updatedUser);
                                }
                            }, (e) => {
                                console.log('Error in Updated user', e);
                            })
                        }
                    }, (e) => {
                        console.log('error while updating data:\n', e);
                    });
                } else {
                    new User(modelData).save().then((newCreatedUser) => {
                        if (newCreatedUser) {
                            return done(null, newCreatedUser);
                        }
                        console.log('new user is not created');
                    }, (e) => {
                        console.log('Somthing went wrong when creating new User database\n', e)
                    });
                }
            });
        }

    }, (e) => console.log(e));
}));