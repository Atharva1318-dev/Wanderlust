const Joi = require('joi');

const reviewSchema = Joi.object({ //Joi.object is a method think of Joi as an object, and .object() a method of it
    review: Joi.object({
        rating: Joi.number().min(1).max(5).required(),
        comment: Joi.string().required(),
    }).required()
});

module.exports = reviewSchema;