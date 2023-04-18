const Joi = require("joi");

const id = Joi.number().integer().positive();
const name = Joi.string().trim().min(2).max(50);
const description = Joi.string().trim().min(2).max(255);
const address = Joi.string().trim().min(2).max(255);
const phone = Joi.string().trim().min(10).max(20);
const photoUrl = Joi.string().trim().uri().max(255);

const getLocalSchema = Joi.object({
    id: id.required(),
});

const createLocalSchema = Joi.object({
    name: name.required(),
    description: description.required(),
    address: address.required(),
    phone: phone.required(),
    photoUrl: photoUrl.required(),
});

const updateLocalSchema = Joi.object({
    name,
    description,
    address,
    phone,
    photoUrl,
});

module.exports = { getLocalSchema, createLocalSchema, updateLocalSchema };
