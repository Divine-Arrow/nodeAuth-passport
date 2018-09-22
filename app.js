const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const cokkieSesion = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const userRoutes = require('./routes/user-routes');
const keys = require('./config/keys');
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
    maxAge: 24 * 60 * 1000,
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
        return res.redirect('/login');
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

// login
app.get('/login', (req, res) => {
    if (req.user)
        return res.redirect('/profile')
    res.render('login');
});

// register
app.get('/register', (req, res) => {
    if (req.user)
        return res.redirect('/profile')
    res.render('register');
});

// register
app.post('/register', (req, res) => {
    res.send(JSON.stringify(req.body,undefined,2));
});

// auth routes
app.use('/auth', authRoutes);

app.use('/profile', authCheck, profileRoutes);

app.use('/user', authCheck, userRoutes);

app.listen(3000, () => {
    console.log('server is started in port: 3000');
});