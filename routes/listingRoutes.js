const express = require("express");
const router = express.Router();
const Listing = require("../models/listing");
const Review = require("../models/review");
const listingSchema = require("../schema");
const ExpressErr = require("../utilities/ExpressErr");
const wrapAsync = require("../utilities/wrapAsync");
const { isLoggedIn, isOwner } = require("../middleware");
const { index, newListingForm, newListingPost, show, editListingForm, updateListing, deleteListing } = require("../controllers/listings");

const multer = require('multer')
const { storage } = require("../cloudConfig");
const upload = multer({ storage }); //instead of saving in uploads folder now it will save in cloudinary storage


const validateListing = (req, res, next) => {
    let result = listingSchema.validate(req.body); //.validate is a method of listingSchema object
    if (result.error) {
        throw new ExpressErr(400, result.error);
    }
    else {
        next();
    }
}

//Index route+Create route
router.route("/").get(wrapAsync(index))
    .post(upload.single("image"), validateListing, wrapAsync(newListingPost));
// router.get("/", wrapAsync(index));

//New route
router.get("/new", isLoggedIn, newListingForm);


//Create route
// router.post("/", validateListing, wrapAsync(newListingPost));

//Show route
router.get("/:id", wrapAsync(show));

//Edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(editListingForm));

//Update route+Delete route
router.route("/:id").put(isLoggedIn, isOwner, upload.single("image"), validateListing, wrapAsync(updateListing)).delete(isLoggedIn, isOwner, wrapAsync(deleteListing));

// router.put("/:id", isLoggedIn, isOwner, wrapAsync(updateListing));

// //Delete route
// router.delete("/:id", isLoggedIn, isOwner, wrapAsync(deleteListing));

module.exports = router;