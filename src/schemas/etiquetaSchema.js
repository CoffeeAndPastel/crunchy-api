const Joi = require("joi");

const id = Joi.number().integer().positive();
const name = Joi.string().trim().min(2).max(50);

const getEtiquetaSchema = Joi.object({
    id: id.required(),
});

const createEtiquetaSchema = Joi.object({
    name: name.required(),
});

const updateEtiquetaSchema = Joi.object({
    name,
});

module.exports = {
    getEtiquetaSchema,
    createEtiquetaSchema,
    updateEtiquetaSchema,
};
