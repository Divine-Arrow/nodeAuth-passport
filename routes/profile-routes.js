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


router.get('/', authCheck, (req, res) => {
    if (req.user.gThumbnail) {
        req.user.gThumbnail480 = `${req.user.gThumbnail.split('?sz')[0]}?sz=480`
        req.user.gThumbnail25 = `${req.user.gThumbnail.split('?sz')[0]}?sz=25`
    }
    var userData = _.pick(req.user, ['gThumbnail480', 'gThumbnail25', 'gThumbnail', 'fThumbnail', 'name', 'email', 'firstName', 'lastName', 'gender', 'birthdate', 'hometown', 'location', 'id']);
    for (var prop in userData) {
        if (prop === 'gThumbnail' && userData[prop]) {
            // console.log('**********\ngot it\n',prop);
            userData.isFThumbnail = false;
            userData.isGThumbnail = true;
        } else if(prop === 'fThumbnail' && userData[prop]){
            userData.isFThumbnail = true;
            userData.isGThumbnail = false;
        }
        if (!userData[prop] && typeof userData[prop] !== Boolean) {
            userData[prop] = '-----';
        }
    }
    res.render('profile', {
        userData
    });
});

module.exports = router;