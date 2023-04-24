const Joi = require("joi");

const usuarioId = Joi.number().integer().positive().required();
const platilloId = Joi.number().integer().positive().required();

const createPlatilloPorUsuarioSchema = Joi.object({
    platilloId,
});

const getPlatillosPorUsuarioSchema = Joi.object({
    usuarioId,
});

module.exports = {
    createPlatilloPorUsuarioSchema,
    getPlatillosPorUsuarioSchema,
};
