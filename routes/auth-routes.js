const router = require('express').Router();
const passport = require('passport');

router.get('/login', (req, res) => {
    res.send('login');
});

router.get('/logout', (req, res) => {
    // passport code
    req.logout();
    res.redirect('/');
});

router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/facebook', passport.authenticate('facebook', {
    // the scope is porvided on the passport-setup.js
    scope: ['email', 'user_gender', 'user_birthday', 'user_location', 'user_hometown', 'user_age_range']
}));

// redirect route of GOOGLE
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('/profile');
});

// redirect route of FACEBOOK
router.get('/facebook/redirect', passport.authenticate('facebook'), (req, res) => {
    // res.redirect('/profile')
    res.redirect('/profile');
});

module.exports = router;