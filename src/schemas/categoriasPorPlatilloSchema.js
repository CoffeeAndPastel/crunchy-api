const Joi = require("joi");

const platilloId = Joi.number().integer().positive().required();
const categoriaId = Joi.number().integer().positive().required();

const createCategoriasPorPlatilloSchema = Joi.object({
    categoriaId,
});

const getCategoriasPorPlatilloSchema = Joi.object({
    platilloId,
});

module.exports = {
    createCategoriasPorPlatilloSchema,
    getCategoriasPorPlatilloSchema,
};
