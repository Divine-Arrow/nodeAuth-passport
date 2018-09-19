const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const cokkieSesion = require('cookie-session');
const passport =require('passport');

const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const keys = require('./config/keys');
const passportSetup = require('./config/passport-setup');
const app = express();

// connect mongoDB
mongoose.connect(keys.mongo.stringURI,{ useNewUrlParser: true });


// view engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));
app.use(cokkieSesion({
    maxAge: 24*60*1000,
    keys: [keys.session.key]
}));
app.use(passport.initialize());
app.use(passport.session());


// app.all('*', authCheck);

// Home(root) route
app.get('/', (req,res)=> {
    res.render('home',{script: true});
});

app.get('/login', (req,res)=> {
    res.render('login');
});

// auth routes
app.use('/auth', authRoutes);

app.use('/profile', profileRoutes);

app.listen(3000, ()=> {
    console.log('server is started in port: 3000');
});