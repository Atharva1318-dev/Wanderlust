const Listing = require("./models/listing");
const Review = require("./models/review");

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) { //bascially we can say that this will check if the req.user object is undefined or not if undefined means not logged in yet, similar to writing !req.user
        req.session.redirectUrl = req.originalUrl;
        // res.locals.redirectUrl = req.originalUrl;
        req.flash("error", "you must login first!");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if ((listing) && (!listing.owner.equals(res.locals.currUser._id))) {
        req.flash("error", "You are not authorized!");
        return res.redirect(`/listings/${id}`); // to write return is important otherwise the res which we send in async func after this will also get sent, causing error of sending two responses
    }
    next();
}


module.exports.isAuthor = async (req, res, next) => {
    let { id, reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if (!review.author.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not authorized!");
        return res.redirect(`/listings/${id}`);
    } 
    next();
}