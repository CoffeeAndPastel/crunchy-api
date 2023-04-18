const Joi = require("joi");

const id = Joi.number().integer().positive();
const usuarioId = Joi.number().integer().positive().allow(null);
const state = Joi.string().trim().min(2).max(50).required();
const address = Joi.string().trim().min(2).max(255).required();
const total = Joi.number().positive().precision(2).required();

const getPedidoSchema = Joi.object({
    id: id.required(),
});

const createPedidoSchema = Joi.object({
    usuarioId,
    state,
    address,
    total,
});

const updatePedidoSchema = Joi.object({
    usuarioId,
    state,
    address,
    total,
});

module.exports = {
    getPedidoSchema,
    createPedidoSchema,
    updatePedidoSchema,
};
