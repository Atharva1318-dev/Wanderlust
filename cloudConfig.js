const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

//Making a new folder on cloudinary to save our files
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'wanderlust_DEV', //name of our folder
        allowedFormat: ["png", "jpg", "jpeg"], // specifying formats of our file
    },
});

module.exports = {
    cloudinary,
    storage
}