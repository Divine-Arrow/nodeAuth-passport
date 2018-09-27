const router = require('express').Router();
const _ = require('lodash');

const User = require('../models/user-model');
const transferSetup = require('../config/transferSetup');

router.get('/delete/:id', (req, res) => {
    User.deleteOne({
        _id: req.params.id
    }).then((removedUser) => {
        if (removedUser.n > 0) {
            return res.redirect('/auth/login');
        }
        return res.redirect('/profile')
    }, (e) => {
        console.log('Something went wrong while deleting user\n', e)
    });
});

router.get('/edit/:id', (req, res) => {
    const userData = transferSetup(req.user);
    res.render('edit', {
        userData
    });
});

router.post('/updateProfile/:id', (req, res) => {

    const newData = _.pick(req.body, ['firstName', 'lastName', 'gender', 'birthdate', 'hometown', 'location']);
    User.findByIdAndUpdate(req.params.id, newData, {
        new: true
    }).then((updatedData) => {
        if (updatedData) {
            res.redirect('/profile');
        }
    }, (e) => {
        res.redirect('/profile');
    });
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/auth/login');
});


module.exports = router;