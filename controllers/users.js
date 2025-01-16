const User = require("../models/user");
const passport = require("passport");

module.exports.loginForm = (req, res) => {
    res.render("users/login.ejs");
};



module.exports.signupForm = (req, res) => {
    res.render("users/signup.ejs");
};

module.exports.signupPost = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        let newUser = new User({
            email: email,
            username: username
        });
        let regUser = await User.register(newUser, password); //.register method is provided by passport-local-mongoose,  don’t need to explicitly call .save() because register internally does it after hashing the password and preparing the user object.
        console.log(regUser);
        req.login(regUser, (err) => {//this .logout method is already provided by passport, it takes a callback as a parameter in which we define what task is to be done when process of logout is completed
            if (err) { // If there's an error, it passes it to the next middleware.
                next(err);
            }
            req.flash("success", "Welcome to Wanderlust!");
            res.redirect("/listings");
        })
    } catch (e) {
        req.flash("error", e.message);
        console.log(e);
        res.redirect("/signup");
    }
};

module.exports.loginPost = async (req, res) => {
    req.flash("success", "Login successful,Welcome back!");
    //console.log(res.locals.redirectUrl);
    if (res.locals.redirectUrl) {
        res.redirect(res.locals.redirectUrl);
    }
    else {
        res.redirect("/listings");
    }
    //console.log(req.user);
};

module.exports.logout = (req, res, next) => {
    req.logout((err) => {//this .logout method is already provided by passport, it takes a callback as a parameter in which we define what task is to be done when process of logout is completed
        if (err) { // If there's an error, it passes it to the next middleware.
            next(err);
        }
        req.flash("success", "You are logged out!");
        res.redirect("/listings");
    })
};
