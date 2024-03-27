const Post = require('../models/post')
const wrapasync = require('../utils/wrapAsync')
const customError = require('../utils/customError')

let renderAllPosts = wrapasync(async (req, res) => {
    let posts = await Post.find({}).populate('owner')
    res.render('posts.ejs', { posts })
})


let getPost = wrapasync(async (req, res) => {
    let { id } = req.params
    let post = await Post.findById(id).populate({ path: "comments", populate: { path: "owner" } }).populate('owner');
    if (!post) {
        req.flash('error', 'Post does not exist')
        res.redirect("/")
    }
    res.render('post.ejs', { post })
})


let getnewPostForm = (req, res) => {
    res.render('newpost.ejs')
}

let saveNewPost = wrapasync(async (req, res, next) => {
    let post = req.body;
    let url = await req.file.path;
    let filename = await req.file.filename;
    let currUser = req.user._id;

    if (!url || !filename || !post.title || !post.description) {
        const err = new customError(500, 'Please fill the required fields!');
        return next(err);
    }
    post = new Post({
        title: post.title,
        description: post.description,
        img: { url: url, filename: filename },
        owner: currUser
    });

    try {
        await post.save();
        console.log(post);
        req.flash('success', 'post created');
        res.redirect('/');
    } catch (error) {
        return next(error);
    }
});

let getEditpostForm = wrapasync(async (req, res) => {
    let { id } = req.params;
    let post = await Post.findById(id);
    if (!post) {
        req.flash("error", "Post does not exist")
        res.redirect('/')
    }
    res.render('editpost.ejs', { post })
})


let saveEditedPost = wrapasync(async (req, res, next) => {
    const { id } = req.params;
    const newData = req.body;

    try {
        let updatedPost = await Post.findById(id);

        if (!updatedPost) {
            const err = new customError(404, 'Post not found');
            return next(err);
        }

        if (newData.title) {
            updatedPost.title = newData.title;
        }
        if (newData.description) {
            updatedPost.description = newData.description;
        }

        if (req.file) {
            let url = req.file.path;
            let filename = req.file.filename;
            updatedPost.img = { url, filename };
        }

        await updatedPost.save();

        req.flash('success', 'Post edited successfully');
        res.redirect("/");
    } catch (error) {
        return next(error);
    }
});


let deletePost = wrapasync(async (req, res) => {
    let { id } = req.params;
    await Post.findByIdAndDelete(id).then(() => { console.log("success deleting") }).catch((err) => { err })
    req.flash('success', 'Post deleted successfully')
    res.redirect('/')
})

module.exports = { renderAllPosts, getPost, getnewPostForm, saveNewPost, getEditpostForm, saveEditedPost, deletePost }