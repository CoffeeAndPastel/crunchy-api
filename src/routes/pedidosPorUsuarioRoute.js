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
    getLastPedido,
} = require("../controllers/pedidosPorUsuarioController");
const { getPedidosPorUsuarioSchema } = require("../schemas/usuarioSchema");
const {
    platillosPorpedidoPorUsuarioRoute,
    platillosPorpedidosorUsuarioRouter,
} = require("./platillosPorPedidoPorUsuarioRoute");

const pedidosPorUsuarioRoute = "/:usuarioId/pedidos";
const pedidosPorUsuarioRouter = express.Router({ mergeParams: true });

pedidosPorUsuarioRouter.get(
    "/",
    validatorHandler(getPedidosPorUsuarioSchema, "params"),
    async (req, res, next) => {
        try {
            const { usuarioId } = req.params;

            const pedidos = await getAllPedidos(usuarioId);
            res.json({
                message: "Pedidos obtenidos correctamente",
                body: pedidos,
            });
        } catch (error) {
            next(error);
        }
    }
);

pedidosPorUsuarioRouter.get(
    "/last",
    validatorHandler(getPedidosPorUsuarioSchema, "params"),
    async (req, res, next) => {
        try {
            const { usuarioId } = req.params;
            const pedido = await getLastPedido(usuarioId);
            res.json({
                message: "Pedido obtenido correctamente",
                body: pedido,
            });
        } catch (error) {
            next(error);
        }
    }
);

pedidosPorUsuarioRouter.get(
    "/:id",
    validatorHandler(getPedidosPorUsuarioSchema, "params"),
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

pedidosPorUsuarioRouter.post(
    "/",
    validatorHandler(getPedidosPorUsuarioSchema, "params"),
    async (req, res, next) => {
        try {
            const { usuarioId } = req.params;

            const pedido = await createPedido({ usuarioId });
            res.status(201).json({
                message: "Pedido creado correctamente",
                body: pedido,
            });
        } catch (error) {
            next(error);
        }
    }
);

pedidosPorUsuarioRouter.patch(
    "/:id",
    validatorHandler(getPedidosPorUsuarioSchema, "params"),
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

pedidosPorUsuarioRouter.delete(
    "/:id",
    validatorHandler(getPedidosPorUsuarioSchema, "params"),
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

pedidosPorUsuarioRouter.use(
    platillosPorpedidoPorUsuarioRoute,
    platillosPorpedidosorUsuarioRouter
);

module.exports = { pedidosPorUsuarioRoute, pedidosPorUsuarioRouter };
