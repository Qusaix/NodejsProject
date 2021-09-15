const express = require('express');
const mongoose = require('mongoose');
const articlesRoute = require('./routes/articles');
const Article = require('./models/article');
const mothodOverride = require('method-override');
const app = express();
var bodyParser = require('body-parser')
var util= require('util');


app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//consect the database
mongoose.connect('mongodb://localhost/blog',{
    useUnifiedTopology:true,
    useNewUrlParser:true,
    useCreateIndex:true
});
// to make the html take varibales
app.set('view engine','ejs');

app.use(mothodOverride('_method'));

//conect the router with the app
app.use('/articles',articlesRoute);

// get all articles
app.get('/',(req,res)=>{
    Article.find({},(err,articles)=>{
        res.render("articles/index",{articles});
    });
});


app.listen(5000);