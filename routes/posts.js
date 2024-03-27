const express=require ('express')
const postRoutes=new express.Router();
const {isAuthenticated, isPostOwner}=require('../utils/middlewares')
const {storage}=require('../utils/cloudinary')

let {renderAllPosts, getPost, getnewPostForm, saveNewPost, getEditpostForm, saveEditedPost, deletePost}=require('../controllers/post')

const multer  = require('multer')
const upload = multer({ storage })

postRoutes.get('/', renderAllPosts )

postRoutes.get('/posts/:id', getPost);

postRoutes.get('/new',isAuthenticated, getnewPostForm)

postRoutes.post('/new', isAuthenticated, upload.single('img'), saveNewPost)

postRoutes.get('/edit/:id',isAuthenticated, isPostOwner, getEditpostForm);

postRoutes.put('/edit/:id',isAuthenticated, isPostOwner,upload.single('img'), saveEditedPost);

postRoutes.delete("/delete/:id", isAuthenticated, isPostOwner, deletePost);


module.exports=postRoutes;