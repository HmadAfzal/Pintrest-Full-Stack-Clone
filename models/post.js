const mongoose = require('mongoose');
const Schema= mongoose.Schema;
const Comment=require('./comment')
const User=require('./user')

const postSchema= new Schema({
img:{
    url:String,
    filename:String
},
title:{
    type:String,
},
description:{
    type:String,
    required:true
},
comments:[{
    type: Schema.Types.ObjectId,
    ref:Comment
}],
owner:{
    type:Schema.Types.ObjectId,
    ref:User
}
})

// const demoPosts = [
//     {   
//         img: 'https://source.unsplash.com/random/800x600/?nature',
//         title: 'Beautiful Nature',
//         likes: 10
//     },
//     {   
//         img: 'https://source.unsplash.com/random/800x600/?technology',
//         title: 'Futuristic Technology',
//         likes: 15
//     },
//     {
//         img: 'https://source.unsplash.com/random/800x600/?food',
//         title: 'Delicious Food',
//         likes: 20
//     },
//     {
//         img: 'https://source.unsplash.com/random/800x600/?travel',
//         title: 'Exotic Travel',
//         likes: 18
//     },
//     {
//         img: 'https://source.unsplash.com/random/800x600/?music',
//         title: 'Melodious Music',
//         likes: 12
//     },
//     {
//         img: 'https://source.unsplash.com/random/800x600/?fashion',
//         title: 'Trendy Fashion',
//         likes: 25
//     },
//     {
//         img: 'https://source.unsplash.com/random/800x600/?architecture',
//         title: 'Architectural Marvels',
//         likes: 30
//     },
//     {
//         img: 'https://source.unsplash.com/random/800x600/?art',
//         title: 'Creative Artwork',
//         likes: 28
//     },
//     {
//         img: 'https://source.unsplash.com/random/800x600/?sports',
//         title: 'Exciting Sports',
//         likes: 22
//     },
//     {
//         img: 'https://source.unsplash.com/random/800x600/?animals',
//         title: 'Adorable Animals',
//         likes: 35
//     },
//     {
//         img: 'https://source.unsplash.com/random/800x600/?science',
//         title: 'Intriguing Science',
//         likes: 40
//     },
//     {
//         img: 'https://source.unsplash.com/random/800x600/?business',
//         title: 'Business Success',
//         likes: 27
//     },
//     {
//         img: 'https://source.unsplash.com/random/800x600/?cars',
//         title: 'Luxurious Cars',
//         likes: 16
//     },
//     {
//         img: 'https://source.unsplash.com/random/800x600/?movies',
//         title: 'Entertaining Movies',
//         likes: 19
//     },
//     {
//         img: 'https://source.unsplash.com/random/800x600/?fitness',
//         title: 'Fitness Lifestyle',
//         likes: 21
//     },
//     {
//         img: 'https://source.unsplash.com/random/800x600/?books',
//         title: 'Captivating Books',
//         likes: 33
//     },
//     {
//         img: 'https://source.unsplash.com/random/800x600/?family',
//         title: 'Warm Family Moments',
//         likes: 24
//     },
//     {
//         img: 'https://source.unsplash.com/random/800x600/?work',
//         title: 'Productive Workspaces',
//         likes: 17
//     },
//     {
//         img: 'https://source.unsplash.com/random/800x600/?health',
//         title: 'Healthy Lifestyle',
//         likes: 29
//     },
//     {
//         img: 'https://source.unsplash.com/random/800x600/?friends',
//         title: 'Fun with Friends',
//         likes: 31
//     }
// ];

postSchema.post('findOneAndDelete', async (post)=>{
    if(post){
        await Comment.deleteMany({_id: {$in: post.comments}})
    }
})


const Post=mongoose.model('Post', postSchema)

// Post.insertMany(demoPosts).then(()=>{console.log("done")}).catch(()=>{'error'})


module.exports=Post;


