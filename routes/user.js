const express=require('express');
const userRoute=new express.Router();
const passport = require('passport');
const { redirecturl } = require('../utils/middlewares');
const { registerUser, getSignUpForm, getLoginForm, loginUser, logOutUser }=require('../controllers/user');
const multer = require('multer');
const {storage}=require('../utils/cloudinary')
const upload = multer({ storage })




userRoute.get("/signup", getSignUpForm)

userRoute.post("/signup", upload.single('pfp'),registerUser);

userRoute.get("/login", getLoginForm)

userRoute.post("/login", redirecturl, passport.authenticate('local', { failureRedirect: '/login', faliureFlash: true }), loginUser )

userRoute.get("/logout", logOutUser)


module.exports=userRoute