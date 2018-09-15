const router = require('express').Router();
const _ = require('lodash');

const authCheck = (req, res, next) => {
    if (!req.user) {
        res.locals.isUser = false;
        return res.redirect('/login');
    }
    res.locals.isUser = true;
    next();
};

router.get('/', authCheck, (req, res) => {
    var userData = _.pick(req.user, ['userName', 'gImageUrl']);
    res.render('profile', {userData});
});

module.exports = router;