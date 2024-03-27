
const User=require('../models/user')
const wrapasync = require('../utils/wrapAsync')

const getSignUpForm=(req, res) => {
    res.render('signup.ejs')
}


const registerUser=wrapasync(async (req, res, next) => {
    let { username, email, password } = req.body;
   let url=req.file.path;
   let filename=req.file.filename;
    
    try {
        let user = ({ username, email, pfp:{url, filename} });
        let reguser = await User.register(user, password);
        console.log(reguser)
        req.flash('success', `Welcome ${username}`)
        req.login(reguser, (err) => {
            if (err) {
                return next(err);
            }
            res.redirect('/');
        });
    } catch (error) {
        req.flash('error', error.message)
        res.redirect('/signup');
    }
})


const getLoginForm=(req, res) => {
    res.render('login.ejs')
}


const loginUser=async (req, res) => {
    req.flash('success', 'Welcome back')
    let redirecturl=res.locals.redirectUrl || '/';
    res.redirect(redirecturl)

}

const logOutUser= (req, res) => {
    req.logout((err) => {
        if (err) {
            req.flash('error', 'error logging out')
        }
        else {
            req.flash('success', 'Logged out successfully')
            res.redirect('/')
        }
    })
}

module.exports={registerUser, getSignUpForm, getLoginForm, loginUser, logOutUser}