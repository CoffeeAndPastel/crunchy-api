const Joi = require("joi");

const id = Joi.number().integer().positive();
const name = Joi.string().trim().min(2).max(50).required();

const getCategoriaSchema = Joi.object({
    id: id.required(),
});

const createCategoriaSchema = Joi.object({
    name,
});

const updateCategoriaSchema = Joi.object({
    name,
});

module.exports = {
    getCategoriaSchema,
    createCategoriaSchema,
    updateCategoriaSchema,
};
