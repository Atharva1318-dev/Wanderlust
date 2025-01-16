const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utilities/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const { loginForm, loginPost, logout, signupForm, signupPost } = require("../controllers/users");

router.route("/signup").get(signupForm).post(wrapAsync(signupPost));

// router.get("/signup", signupForm);

// router.post("/signup", wrapAsync(signupPost));

router.route("/login").get(loginForm).post(saveRedirectUrl, passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }), loginPost);

// router.get("/login", loginForm);

// router.post("/login", saveRedirectUrl, passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }), loginPost);

router.get("/logout", logout);

module.exports = router;