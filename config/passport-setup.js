const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

const keys = require('./keys');

passport.use(
    new GoogleStrategy({
        // option for google strategy
        ClientID: keys.ClientID,
        clientSecret:: keys.clientSecret
    }),
    () => {
        // passport callback function
    }
);