const Joi = require("joi");

const pedidoId = Joi.number().integer().positive();
const platilloId = Joi.number().integer().positive();
const amount = Joi.number().integer().positive();

const getPlatillosPorPedidoSchema = Joi.object({
    pedidoId: pedidoId.required(),
    platilloId: platilloId.required(),
});

const createPlatillosPorPedidoSchema = Joi.object({
    platilloId: platilloId.required(),
    amount,
});

const updatePlatillosPorPedidoSchema = Joi.object({
    amount: amount.required(),
});

module.exports = {
    getPlatillosPorPedidoSchema,
    createPlatillosPorPedidoSchema,
    updatePlatillosPorPedidoSchema,
};
