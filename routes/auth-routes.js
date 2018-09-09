const router = require('express').Router();

router.get('/login', (req, res) => {
    res.send('login');
});

router.get('/logout', (req, res) => {
    // passport code
    res.send('logout');
});

router.get('/google', (req, res) => {
    // passport code
    res.send('google');
});

module.exports = router;