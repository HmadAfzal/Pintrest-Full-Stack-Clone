const mongoose = require('mongoose');
const User = require('./user');
const Schema= mongoose.Schema;

const commentSchema=new Schema({
    Comment:{
        type:String,
        required:true
    },
    postedat:{
        type:Date,
        default:Date.now()
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:User
    }
})

const Comment=new mongoose.model("Comment",commentSchema);
module.exports=Comment;