const express = require("express");
const router = express.Router({ mergeParams: true });// this to be done so that the id parameter can reach this file and does not getting limited upto app.js itself , this property reserves the req.params values from the parent router
const Review = require("../models/review");
const Listing = require("../models/listing");
const reviewSchema = require("../reviewschema");
const ExpressErr = require("../utilities/ExpressErr");
const wrapAsync = require("../utilities/wrapAsync");
const { isLoggedIn, isAuthor } = require("../middleware");
const { reviewPost, reviewDelete } = require("../controllers/reviews");

const validateReview = (req, res, next) => {
    let result = reviewSchema.validate(req.body); //.validate is a method of listingSchema object
    if (result.error) {
        throw new ExpressErr(400, result.error);
    }
    else {
        next();
    }
}

//Post review
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewPost));

//Review delete
router.delete("/:reviewId", isLoggedIn, isAuthor, wrapAsync(reviewDelete));

module.exports = router;