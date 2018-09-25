const router = require('express').Router();
const passport = require('passport');

// locsl-register
router.get('/register', (req, res) => {
    if (req.user)
        return res.redirect('/profile');
    res.render('register');
});

router.post('/register', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/register'
}));

// local-login
router.get('/login', (req, res) => {
    if (req.user)
        return res.redirect('/profile')
    res.render('login');
});

router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: 'auth/login'
}));

// google
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

// redirect route of GOOGLE
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('/profile');
});

// facebook
router.get('/facebook', passport.authenticate('facebook', {
    // the scope is porvided on the passport-setup.js
    scope: ['email', 'user_gender', 'user_birthday', 'user_location', 'user_hometown', 'user_age_range']
}));

// redirect route of FACEBOOK
router.get('/facebook/redirect', passport.authenticate('facebook', {
    failureRedirect: '/auth/login'
}), (req, res) => {
    // res.redirect('/profile')
    res.redirect('/profile');
});

module.exports = router;