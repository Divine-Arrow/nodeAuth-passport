const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const cokkieSesion = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const userRoutes = require('./routes/user-routes');
const User = require('./models/user-model');

// env setup
var port = process.env.PORT || 3000;
var keys;
try {
    keys = require('./config/keys');
} catch (e) {
    keys = require('./config/herokuKeys');
};

const passportSetup = require('./config/passport-setup');
const app = express();

// connect mongoDB
mongoose.connect(keys.mongo.stringURI, {
    useNewUrlParser: true
});

// view engine
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(__dirname + '/public'));
app.use(cokkieSesion({
    maxAge: 60 * 60 * 1000,
    keys: [keys.session.key]
}));
app.use(passport.initialize());
app.use(passport.session());

// auth Check middleware
const authCheck = (req, res, next) => {
    if (!req.user) {
        res.locals.profileThumbnail = null;
        res.locals.profileThumbnail = null;
        res.locals.isUser = false;
        return res.redirect('/auth/login');
    }
    res.locals.isUser = true;
    res.locals.profileThumbnail = req.user.gThumbnail;
    res.locals.profileThumbnail = req.user.fThumbnail;
    next();
};

// Home(root) route
app.get('/', (req, res) => {
    if (!req.user) {
        res.locals.profileThumbnail = null;
        res.locals.profileThumbnail = null;
        res.locals.isUser = false;
    } else {
        res.locals.isUser = true;
        res.locals.profileThumbnail = req.user.gThumbnail;
        res.locals.profileThumbnail = req.user.fThumbnail;
    }
    res.render('home', {
        script: true
    });
});

app.get('/verify/:str', (req, res) => {
    User.findOneAndUpdate({
        verificationLink: req.params.str
    }, {
        $set: {
            isVerified: true
        },
        $unset:{
            verificationLink: 1
        }
    }).then((userData) => {
        if (userData && !userData.isVerified) {
            res.redirect('/auth/login');
        }
        return res.send('error');
    }).catch((e) => {
        if (e)
            console.log('something went wrong at /verify/:str');
    });
});


// auth routes
app.use('/auth', authRoutes);

app.use('/profile', authCheck, profileRoutes);

app.use('/user', authCheck, userRoutes);


app.listen(port, () => {
    console.log(`server is started at port: ${port}`);
});