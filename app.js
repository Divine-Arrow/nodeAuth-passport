const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth-routes');
const keys = require('./config/keys');
const passportSetup = require('./config/passport-setup');
const app = express();

// connect mongoDB
mongoose.connect(keys.mongo.stringURI,{ useNewUrlParser: true });


// view engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use('/auth', authRoutes);
app.use(express.static(__dirname + '/public'));
// Home(root) route
app.get('/', (req,res)=> {
    res.render('home');
});

app.get('/login', (req,res)=> {
    res.render('login');
});

app.listen(3000, ()=> {
    console.log('server is started in port: 3000');
});