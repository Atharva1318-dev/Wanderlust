const Joi = require('joi');

const listingSchema = Joi.object({ //Joi.object is a method think of Joi as an object, and .object() a method of it
    //listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    country: Joi.string().required(),
    price: Joi.number().min(0).required(),
    image: Joi.string().allow("")
    // }).required()
});

module.exports = listingSchema;