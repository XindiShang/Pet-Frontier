const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
})

const Joi = BaseJoi.extend(extension);

module.exports.petshopSchema = Joi.object({
    petshop: Joi.object({
        name: Joi.string().required().escapeHTML(),
        price: Joi.number().required().min(0),
        tel: Joi.string().required().escapeHTML(),
        lng: Joi.string().escapeHTML(),
        lat: Joi.string().escapeHTML(),
        province: Joi.string().required().escapeHTML(),
        city: Joi.string().required().escapeHTML(),
        location: Joi.string().required().escapeHTML(),
        createdAt: Joi.date(),
        description: Joi.string().required().escapeHTML(),
    }).required(),
    deleteImages: Joi.array()
})

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        body: Joi.string().required().escapeHTML(),
        rating: Joi.number().required().min(1).max(5),
        createdAt: Joi.date(),
    }).required()
})
