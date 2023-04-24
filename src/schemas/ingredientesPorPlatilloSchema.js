const Joi = require("joi");

const platilloId = Joi.number().integer().positive().required();
const ingredienteId = Joi.number().integer().positive().required();
const isOptional = Joi.boolean().required();

const createIngredientesPorPlatilloSchema = Joi.object({
    ingredienteId,
    isOptional,
});

const getIngredientesPorPlatilloSchema = Joi.object({
    platilloId,
});

module.exports = {
    createIngredientesPorPlatilloSchema,
    getIngredientesPorPlatilloSchema,
};
