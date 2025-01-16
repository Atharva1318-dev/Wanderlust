const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    //password & username will automatically be defined by passportLocalMongoose,while creating a new user we will give password adn username also, becoz it will be automatically defined, we dont need to define it
});
userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);
module.exports = User;