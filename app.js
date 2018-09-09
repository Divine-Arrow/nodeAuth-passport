const express = require('express');
const exphbs = require('express-handlebars');

const authRoutes = require('./routes/auth-routes');
const app = express();

// view engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use('/auth', authRoutes);
app.use(express.static('public'));
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