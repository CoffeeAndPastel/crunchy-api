const Joi = require("joi");

const id = Joi.number().integer().positive();
const name = Joi.string().trim().min(2).max(50);

const getIngredienteSchema = Joi.object({
    id: id.required(),
});

const createIngredienteSchema = Joi.object({
    name: name.required(),
});

const updateIngredienteSchema = Joi.object({
    name,
});

module.exports = {
    getIngredienteSchema,
    createIngredienteSchema,
    updateIngredienteSchema,
};
