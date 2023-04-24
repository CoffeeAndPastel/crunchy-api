const Joi = require("joi");

const platilloId = Joi.number().integer().positive().required();
const etiquetaId = Joi.number().integer().positive().required();

const createEtiquetasPorPlatilloSchema = Joi.object({
    etiquetaId,
});

const getEtiquetasPorPlatilloSchema = Joi.object({
    platilloId,
});

module.exports = {
    createEtiquetasPorPlatilloSchema,
    getEtiquetasPorPlatilloSchema,
};
