const router = require('express').Router();
const _ = require('lodash');

// auth Check middleware
const authCheck = (req, res, next) => {
    if (!req.user) {
        res.locals.isUser = false;
        return res.redirect('/login');
    }
    res.locals.isUser = true;
    next();
};


router.get('/',authCheck, (req, res) => {
    // var userData = _.pick(req.user, ['name', 'fThumbnail' ,'gThumbnail', 'email', 'location']);
    console.log(req.user.gThumbnail);
    res.render('profile', {userData:req.user});
});

module.exports = router;