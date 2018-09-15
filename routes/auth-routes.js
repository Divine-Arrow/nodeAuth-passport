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

router.get('/google', passport.authenticate('google',{
    scope: ['profile']
}));

router.get('/facebook', passport.authenticate('facebook',{
    /* scope: ['email','user_age_range','user_birthday','user_friends','user_gender','user_hometown','user_locations'] */
}));

// redirect route of GOOGLE
router.get('/google/redirect', passport.authenticate('google'), (req,res)=> {
    res.redirect('/profile')
});

// redirect route of FACEBOOK
router.get('/facebook/redirect', passport.authenticate('facebook'), (req,res)=> {
    // res.redirect('/profile')
    res.send('facebook done');
});

module.exports = router;