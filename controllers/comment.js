const Comment = require('../models/comment')
const Post = require('../models/post')
const wrapasync = require('../utils/wrapAsync')

let postComments=wrapasync(async (req, res) => {
    let { id } = req.params
    let { comment } = req.body.comments;
    let ownerId = res.locals.currUser._id;
    let newComment = new Comment({ 
        Comment: comment, 
        owner: ownerId 
    })
    console.log(newComment)
    await newComment.save();
    let post = await Post.findById(id);
    post.comments.push(newComment)
    await post.save();
    console.log(post);

    res.redirect(`/posts/${id}`)
})


let deleteComments= wrapasync(async (req, res) => {
    let { id, commentid } = req.params
    await Comment.findByIdAndDelete(commentid)
    await Post.findByIdAndUpdate(id, { $pull: { comments: commentid } })
    res.redirect(`/posts/${id}`)

})
module.exports={postComments, deleteComments}