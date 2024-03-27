const Comment = require("../models/comment");
const Post = require("../models/post");

function isAuthenticated(req,res,next) {
    if(!req.isAuthenticated()){
        req.session.url=req.originalUrl;
        req.flash('error', 'You have to login or signup first');
        res.redirect('/login')
    }
    next()
}

function redirecturl(req,res,next) {
if(req.session.url){
    res.locals.redirectUrl=req.session.url
}
next();
    
}

async function isPostOwner (req,res,next){
    let {id}=req.params;
    let post= await Post.findById(id)
    if (!post.owner._id==res.locals.currUser._id) {
        req.flash('error','you are not the owner of this post')
    }
    next()
}


module.exports={isAuthenticated, redirecturl, isPostOwner };