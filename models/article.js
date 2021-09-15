const mongoose = require('mongoose');
const slugify = require('slugify');

const articleSchema = new mongoose.Schema({
    title:{
        require:true,
        type:String
    },
    description:{
        require:true,
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    slug:{
        type:String,
        reqired:true,
        unique:true
    }
});

articleSchema.pre('validate',function(){
    if(this.title)
    {
        this.slug = slugify(this.title,{lower:true,strict:true});
    }
})


module.exports = mongoose.model('Article',articleSchema);