const express = require('express');
const articlesRoute = require('./routes/articles');
const app = express();

// to make the html take varibales
app.set('view engine','ejs');

//conect the router with the app
app.use('/articles',articlesRoute);

// makeing an request
app.get('/',(req,res)=>{
    let articles = [
        {'title':'title1','date':Date.now(),description:'This is a long description'},
        {'title':'title2','date':Date.now(),description:'This is a long description'},
    ]
    let name = 'Qusai';
    res.render("index",{articles,name});
});


app.listen(5000);