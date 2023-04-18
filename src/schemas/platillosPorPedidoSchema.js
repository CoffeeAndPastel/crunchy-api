const Joi = require("joi");

const pedidoId = Joi.number().integer().positive();
const platilloId = Joi.number().integer().positive();
const amount = Joi.number().integer().positive();

const getPlatillosPorPedidoSchema = Joi.object({
    pedidoId: pedidoId.required(),
    platilloId: platilloId.required(),
});

const createPlatillosPorPedidoSchema = Joi.object({
    pedidoId: pedidoId.required(),
    platilloId: platilloId.required(),
    amount: amount.required(),
});

const updatePlatillosPorPedidoSchema = Joi.object({
    amount,
});

module.exports = {
    getPlatillosPorPedidoSchema,
    createPlatillosPorPedidoSchema,
    updatePlatillosPorPedidoSchema,
};
