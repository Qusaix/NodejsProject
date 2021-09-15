const express = require('express');
const { validationResult } = require('express-validator');
const  { ArticleValdation }  = require('../RequestValdation/AddArticleValdation');
const Article = require('../models/article');
const router =  express.Router();


router.get('/add',(req,res)=>{
    const article = {}
    res.render('articles/new',{article});
})
router.get('/:slug', async (req,res)=>{
    // FIND THE ARTICLE
    const article = await Article.findOne({ slug:req.params.slug });
    res.render('articles/show',{article});
});
//ADD POST
router.post('/',ArticleValdation , async (req,res)=>{
    //STEP 1 VALDATION
    if(checkErrors(req,res) !== true)res.send('Valdation Error');
    //STEP 2 ADD THE POST
    const article = new Article()
    await savePost(req,res,article);
})
//Edit POST
router.get('/edit/:slug', async (req,res)=>{
    const article = await Article.findOne({slug:req.params.slug});
    res.render('articles/edit',{article})
});
// UPDATE POST
router.post('/update/:slug',ArticleValdation ,async (req,res)=>{
    // VALDATION
    if(checkErrors(req,res) !== true)res.send('Valdation Error');
    // FIND THE ARTICLE
    const article = await Article.findOne({slug:req.params.slug});
    await savePost(req,res,article);

});

// DELETE POST
router.delete('/delete/:id', async (req,res)=>{
    await Article.findByIdAndDelete(req.params.id);
    res.redirect('/');
});
//CHECK IF THERE IS ANY ERRORS IN THE VALDATION
function checkErrors(req,res)
{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    else
    {
        return true;
    }

}
//SAVE THE POST IN ADDING AND UPDATEING THE POST
function savePost(req,res,article)
{
    article.title = req.body.name;
    article.description = req.body.description;
    article.save()
    res.redirect(`/articles/${article.slug}`)
    
}

module.exports = router;