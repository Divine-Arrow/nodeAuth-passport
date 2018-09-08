const express = require('express');
var ejs = require('ejs');
ejs.open = '{{';
ejs.close = '}}';

const app = express();

// view engine
app.set('view engine', 'ejs');
app.use(express.static('public'));
/* 
// ejs delemiters
ejs.open = '{{';
ejs.close = '}}'; */


// Home(root) route
app.get('/', (req,res)=> {
    res.render('home');
});

app.get('/ejs', (req,res)=> {
    res.render('home2');
});

app.listen(3000, ()=> {
    console.log('server is started in port: 3000');
});