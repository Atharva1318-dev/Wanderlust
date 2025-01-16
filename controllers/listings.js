const Listing = require("../models/listing");

const geocoderApi = {
    forwardGeocode: async (config) => {
        try {
            const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(config.query)
                }&format=geojson`;
            const response = await fetch(url); // Await the fetch
            const geojson = await response.json(); // Await JSON parsing

            return {
                features: geojson.features.map(feature => ({
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [
                            (feature.bbox[0] + feature.bbox[2]) / 2,
                            (feature.bbox[1] + feature.bbox[3]) / 2
                        ]
                    },
                    place_name: feature.properties.display_name,
                    properties: feature.properties
                }))
            };
        } catch (error) {
            console.error(`Geocoding error: ${error}`);
            return { features: [] }; // Return an empty result on failure
        }
    }
};


module.exports.index = async (req, res) => {
    // let { searchCountry } = req.query;
    // if (searchCountry) {
    //     console.log("Search country: ", searchCountry);
    //     const allListings = await Listing.find({ country: searchCountry });
    //     res.render("listings/index.ejs", { allListings });
    // }
    // else {
    //     const allListings = await Listing.find({});
    //     res.render("listings/index.ejs", { allListings });
    // }
    let { searchCountry } = req.query;
    if (searchCountry) {
        console.log("Search country: ", searchCountry);
        // Trim whitespace and perform a case-insensitive search
        const allListings = await Listing.find({
            country: { $regex: new RegExp(`^${searchCountry.trim()}$`, "i") },
        });
        res.render("listings/index.ejs", { allListings });
    } else {
        const allListings = await Listing.find({});
        res.render("listings/index.ejs", { allListings });
    }
};

module.exports.newListingForm = (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.newListingPost = async (req, res, next) => {
    //console.log(req.file);
    //console.log(req.user);
    let { title, description, image, price, location, country } = req.body;
    const newListing = new Listing({ title: title, description: description, price: price, location: location, country: country, owner: req.user._id });

    try {
        const result = await geocoderApi.forwardGeocode({ query: req.body.location });
        if (result.features.length > 0) {
            //console.log('Coordinates:', result.features[0].geometry);
            newListing.geometry = result.features[0].geometry;
        } else {
            console.log('No results found.');
        }
    } catch (error) {
        console.error('Error fetching geocoding data:', error);
    }

    // console.log(result);
    // res.send("done");



    newListing.image.url = req.file.path;
    newListing.image.filename = req.file.filename;
    let savedListing = await newListing.save();
    console.log(savedListing);
    req.flash("success", "New listing added successfully!");
    res.redirect("/listings");
};

module.exports.show = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({ path: "reviews", populate: { path: "author", }, }).populate("owner");
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        res.redirect("/listings");
    }
    //console.log(listing);
    res.render("listings/show.ejs", { listing });
};

module.exports.editListingForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        res.redirect("/listings");
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_210/");
    res.render("listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let { title, description, image, price, location, country } = req.body;
    let ans = await Listing.findByIdAndUpdate(id, { title: title, description: description, price: price, image: image, location: location, country: country });
    if (req.file) {
        ans.image.url = req.file.path;
        ans.image.filename = req.file.filename;
        //After adding url and filename we will again save it
        await ans.save();
    }
    req.flash("success", "Listing edited successfully!");
    res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;
    let del = await Listing.findByIdAndDelete(id);
    //console.log(del);
    req.flash("success", "Listing deleted successfully!");
    res.redirect("/listings");
};