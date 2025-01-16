const Review = require("../models/review");
const Listing = require("../models/listing");

module.exports.reviewPost = async (req, res) => {
    let { id } = req.params; // originally it will show id as undefiend, so we have to use express.Router({ mergeParams: true }); 
    let { review } = req.body;
    //console.log(req.body);
    let newReview = new Review({ comment: review.comment, rating: review.rating });
    console.log(req.user._id);
    newReview.author = req.user._id;
    //console.log(newReview);
    let listing = await Listing.findById(id);
    listing.reviews.push(newReview);
    //console.log(listing.reviews);
    await newReview.save();
    await listing.save();
    res.redirect(`/listings/${id}`);
};

module.exports.reviewDelete = async (req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });// to remove that review from reviews array
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`);
};