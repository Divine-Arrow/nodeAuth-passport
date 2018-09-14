const router = require('express').Router();
const passport = require('passport');

router.get('/login', (req, res) => {
    res.send('login');
});

router.get('/logout', (req, res) => {
    // passport code
    res.send('logout');
});

router.get('/google', passport.authenticate('google',{
    scope: ['profile']
}));

// redirect route of GOOGLE
router.get('/google/redirect', passport.authenticate('google'), (req,res)=> {
    res.redirect('/profile')
});

module.exports = router;