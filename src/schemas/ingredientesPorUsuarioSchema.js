const Joi = require("joi");

const usuarioId = Joi.number().integer().positive().required();
const ingredienteId = Joi.number().integer().positive().required();
const frequency = Joi.string().valid("mucha", "poca", "nula").required();

const createIngredientesPorUsuarioSchema = Joi.object({
    ingredienteId,
    frequency,
});

const getIngredientesPorUsuarioSchema = Joi.object({
    usuarioId,
});

module.exports = {
    createIngredientesPorUsuarioSchema,
    getIngredientesPorUsuarioSchema,
};
