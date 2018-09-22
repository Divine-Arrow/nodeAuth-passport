const router = require('express').Router();
const _ = require('lodash');

const User = require('../models/user-model');


// register
router.get('/', (req, res) => {
    if (req.user)
        return res.redirect('/profile')
    res.render('register');
});

// register
router.post('/', (req, res) => {
    if (!req.user) {
        const filterData = [];
        // save data
        for (var prop in req.body) {
            if (req.body[prop]) {
                filterData.push(prop);
            }
        }
        const newUser = _.pick(req.body, filterData);
        new User(newUser).save().then((newData) => {
            if (newData) {
                // successfully saved.
                res.locals.flash = {
                    isSuccess: true,
                    type: 'success',
                    message: 'Successfuly registered. Try login!'
                };
                return res.redirect('/profile');
            }
            return res.redirect('/login');
        }, (e) => {
            if (e.code === 11000) {
                res.redirect('/register')
            } else if (e)
                res.redirect('/register');
        }).catch((e) => {
            if (e) res.redirect('/register');
        });
    }
});


module.exports = router;