const Joi = require("joi");

const id = Joi.number().integer().positive();
const name = Joi.string().trim().min(2).max(50);
const description = Joi.string().trim().min(2).max(255);
const localId = Joi.number().integer().positive();
const photoUrl = Joi.string().trim().uri().max(255);
const price = Joi.number().positive().precision(2);

const getPlatilloSchema = Joi.object({
    id: id.required(),
});

const createPlatilloSchema = Joi.object({
    name: name.required(),
    description: description.required(),
    localId: localId.required(),
    photoUrl,
    price: price.required(),
});

const updatePlatilloSchema = Joi.object({
    name,
    description,
    localId,
    photoUrl,
    price,
});

module.exports = {
    getPlatilloSchema,
    createPlatilloSchema,
    updatePlatilloSchema,
};
