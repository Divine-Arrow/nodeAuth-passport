const router = require('express').Router();

const User = require('../models/user-model');

router.get('/delete/:id', (req, res) => {
    User.deleteOne({
        _id: req.params.id
    }).then((removedUser) => {
        if(removedUser.n > 0){
            return res.redirect('/login');
        }
        return res.redirect('/profile')
    }, (e) => {
        console.log('Something went wrong while deleting user\n', e)
    });
});

module.exports = router;