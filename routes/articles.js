const express = require('express');
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
router.post('/', async (req,res)=>{
    //STEP 1 VALDATION

    //STEP 2 ADD THE POST
    const article = new Article({
        title:req.body.name,
        description:req.body.description
    })
    try {
        await article.save();
        res.redirect(`/articles/${article.slug}`);
    } catch (error) {
        console.log('saveing article error: ',error)
    }
})
//Edit
router.get('/edit/:slug', async (req,res)=>{
    const article = await Article.findOne({slug:req.params.slug});
    res.render('articles/edit',{article})
});
// UPDATE POST
router.post('/update/:slug', async (req,res)=>{
    // FIND THE ARTICLE
    const article = await Article.findOne({slug:req.params.slug});
    article.title = req.body.name;
    article.description = req.body.description;
    try{
        await article.save()
        res.redirect(`/articles/${article.slug}`)
    }
    catch(error){
        cconsole.log('updateing article error: ',error);
    }
});

router.delete('/delete/:id', async (req,res)=>{
    await Article.findByIdAndDelete(req.params.id);
    res.redirect('/');
});
module.exports = router;