const express = require('express');
const mongoose = require('mongoose');
const postRoutes = require('./routes/posts')
const commentRoutes = require('./routes/comments')
const methodOverride = require('method-override')
const app = express();
const port = 8080;
const path = require('path');
const customError = require('./utils/customError')
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash')


//require passport, passport strategy
const User = require('./models/user')
const passport = require('passport');
const localStrategy = require('passport-local');
const userRoute = require('./routes/user');


require('dotenv').config();

const SESSION_SECRET = process.env.SESSION_SECRET;

app.use(methodOverride('_method'))
mongoose.connect('mongodb://127.0.0.1:27017/instaClone')
    .then(() => console.log('Connected!')).catch(() => { console.log('Failed to connect to mongoose') });

app.use(express.urlencoded({ extended: true }));
ejsMate = require('ejs-mate');
app.engine('ejs', ejsMate)


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser("secret"))

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() * 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}));

app.use(flash())

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currUser=req.user;
    next()
})



app.listen(port, () => {
    console.log(`App is listening at port:${port}`);
});



//route for posts
app.use(postRoutes)

//routes for comments
app.use(commentRoutes)

//routes for users
app.use(userRoute)


app.get("*", (req, res, next) => {
    const err = new customError(404, 'Page not found');
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error.ejs', { err });
})
