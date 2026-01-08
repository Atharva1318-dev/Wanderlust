if (process.env.NODE_ENV != "production") {
    require('dotenv').config();
}
//console.log(process.env.SECRET);
const express = require("express");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 8080;
const path = require("path");
const listingRouter = require("./routes/listingRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const userRouter = require("./routes/userRoutes");
const ExpressErr = require("./utilities/ExpressErr");
const Joi = require('joi');
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/user");

app.use(methodOverride('_method'));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine("ejs", ejsMate);

async function main() {
    await mongoose.connect(process.env.ATLASDB_URL);
}

main().then((res) => {
    console.log("connection successful");
})
    .catch((err) => {
        console.log(err);
    });




const store = MongoStore.create({
    mongoUrl: process.env.ATLASDB_URL,
    crypto: {
        secret: process.env.SECRET
    },
    touchAfter: 24 * 3600,
});

store.on("err", () => {
    console.log("ERROR IN MONGO_ATLAS", err);
});


app.use(session({
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000, //Date.now returns the current time in milliseconds so we are setting it to 7 days, by adding the 7 days time in milliseconds
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));//basically we are telling passport to use the local strategy, and User.authenticate handles checking the username and password against the database and determines if the credentials are valid.

passport.serializeUser(User.serializeUser());//after sucessful authentication has happened we say that the user is serialized,This step ensures that only the user ID (a lightweight piece of data) is stored in the session instead of the entire user object.
passport.deserializeUser(User.deserializeUser());

//A middleware to save our flash messages/locals
app.use((req, res, next) => {
    res.locals.newMessage = req.flash("success");
    res.locals.errorMessage = req.flash("error");
    res.locals.currUser = req.user || null;
    next();
})

// app.get("/demouser", async (req, res) => {

//     let fakeUser = new User({
//         email: "student@gmail.com",
//         username: "atharva"
//     });
//     let regUser = await User.register(fakeUser, "helloworld");//this will not only save to db but will also automatically check if the username is unique or not.
//     res.send(regUser);
// });

app.get("/", (req, res) => {
    res.redirect("/listings");
});

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter); // this id is not able to reach the reviewRoutes.js file, it shows undefined there, this id parameter stays here itself, any parameters after this path are able to reach the reviewRoutes.js
app.use("/", userRouter);

app.listen(port, () => {
    console.log("server is listening");
});

app.use("*", (req, res, next) => {
    next(new ExpressErr(404, "Page not found!"));
})

app.use((err, req, res, next) => {
    let { status = 500, message = "Something went wrong" } = err;
    res.status(status).render("error.ejs", { message });
})
