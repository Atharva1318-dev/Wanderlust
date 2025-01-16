const mongoose = require("mongoose");

const initData = require("./data"); //initData is an object and in that we will be accesing data key

const Listing = require("../models/listing");

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

main().then((res) => {
    console.log("connection successful");
})
    .catch((err) => {
        console.log(err);
    });

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((e) => ({ ...e, owner: '6766638a59dac0a6435c3020', }));
    await Listing.insertMany(initData.data);
    console.log("Data was initialized");
};

initDB();