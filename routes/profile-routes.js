const router = require('express').Router();

const transferSetup = require('../config/transferSetup');

router.get('/', (req, res) => {
    const userData = transferSetup(req.user);
    res.render('profile', {
        userData
    });
});

module.exports = router;