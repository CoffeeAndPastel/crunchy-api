const Joi = require("joi");

const id = Joi.number().integer().positive();
const usuarioId = Joi.number().integer().positive();
const state = Joi.string().valid("ordenando", "enviado", "entregado");
const address = Joi.string().trim().min(2).max(255);
const total = Joi.number().positive().precision(2);

const getPedidoSchema = Joi.object({
    id: id.required(),
});

const createPedidoSchema = Joi.object({
    usuarioId: usuarioId.required(),
    address: address.required(),
    total: total.required(),
});

const updatePedidoSchema = Joi.object({
    state,
    address,
    total,
});

module.exports = {
    getPedidoSchema,
    createPedidoSchema,
    updatePedidoSchema,
};
