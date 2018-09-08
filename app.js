const express = require('express');
const exphbs = require('express-handlebars');
const app = express();

// view engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

// Home(root) route
app.get('/', (req,res)=> {
    res.render('home');
});

app.listen(3000, ()=> {
    console.log('server is started in port: 3000');
});