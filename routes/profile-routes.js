const router = require('express').Router();
const _ = require('lodash');

const authCheck = (req, res, next) => {
    if(!req.user) {
        return res.redirect('/login');
    }
    next();
};

router.get('/', authCheck, (req, res)=> {
    console.log(userData);
    var userData = _.pick(req.user, ['username', 'gImageURL']);
    res.render('profile', {userData});
});

module.exports = router;