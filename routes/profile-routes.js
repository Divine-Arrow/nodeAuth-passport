const router = require('express').Router();

const transferSetup = require('../config/transferSetup');

// auth Check middleware
const authCheck = (req, res, next) => {
    if (!req.user) {
        res.locals.isUser = false;
        return res.redirect('/login');
    }
    res.locals.isUser = true;
    next();
};


router.get('/', authCheck, (req, res) => {
    const userData = transferSetup(req.user);
    res.render('profile', {
        userData
    });
});

module.exports = router;