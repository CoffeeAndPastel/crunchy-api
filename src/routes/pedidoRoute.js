const express = require("express");
const { validatorHandler } = require("../middlewares/validator");
const {
    getPedidoSchema,
    createPedidoSchema,
    updatePedidoSchema,
} = require("../schemas/pedidoSchema");
const {
    getAllPedidos,
    getPedidoById,
    createPedido,
    updatePedido,
    deletePedido,
} = require("../controllers/pedidoController");

const pedidoRoute = "/pedidos";
const pedidoRouter = express.Router();

pedidoRouter.get("/", async (req, res, next) => {
    try {
        const pedidos = await getAllPedidos();
        res.json({
            message: "Pedidos obtenidos correctamente",
            body: pedidos,
        });
    } catch (error) {
        next(error);
    }
});

pedidoRouter.get(
    "/:id",
    validatorHandler(getPedidoSchema, "params"),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const pedido = await getPedidoById(id);
            res.json({
                message: "Pedido obtenido correctamente",
                body: pedido,
            });
        } catch (error) {
            next(error);
        }
    }
);

pedidoRouter.post(
    "/",
    validatorHandler(createPedidoSchema),
    async (req, res, next) => {
        try {
            const pedido = await createPedido(req.body);
            res.status(201).json({
                message: "Pedido creado correctamente",
                body: pedido,
            });
        } catch (error) {
            next(error);
        }
    }
);

pedidoRouter.patch(
    "/:id",
    validatorHandler(updatePedidoSchema),
    validatorHandler(getPedidoSchema, "params"),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const pedido = await updatePedido(id, req.body);
            res.json({
                message: "Pedido actualizado correctamente",
                body: pedido,
            });
        } catch (error) {
            next(error);
        }
    }
);

pedidoRouter.delete(
    "/:id",
    validatorHandler(getPedidoSchema, "params"),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            await deletePedido(id);
            res.json({ message: "Pedido eliminado correctamente" });
        } catch (error) {
            next(error);
        }
    }
);

module.exports = { pedidoRoute, pedidoRouter };
