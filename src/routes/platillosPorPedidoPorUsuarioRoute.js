const express = require("express");
const {
    createPlatilloPorPedido,
    deletePlatillosPorPedido,
    updatePlatillosPorPedido,
} = require("../controllers/platillosPorPedidoPorUsuarioController");
const { validatorHandler } = require("../middlewares/validator");
const {
    createPlatillosPorPedidoSchema,
    getPlatillosPorPedidoSchema,
    updatePlatillosPorPedidoSchema,
} = require("../schemas/platillosPorPedidoSchema");

const platillosPorpedidoPorUsuarioRoute = "/:pedidoId/platillos";
const platillosPorpedidosorUsuarioRouter = express.Router({
    mergeParams: true,
});

platillosPorpedidosorUsuarioRouter.post(
    "/",
    validatorHandler(createPlatillosPorPedidoSchema),
    async (req, res, next) => {
        try {
            const { pedidoId } = req.params;

            const pedido = await createPlatilloPorPedido({
                pedidoId,
                ...req.body,
            });
            res.status(201).json({
                message: "Pedido creado correctamente",
                body: pedido,
            });
        } catch (error) {
            next(error);
        }
    }
);

platillosPorpedidosorUsuarioRouter.patch(
    "/:platilloId",
    validatorHandler(getPlatillosPorPedidoSchema, "params"),
    validatorHandler(updatePlatillosPorPedidoSchema),
    async (req, res, next) => {
        try {
            const { pedidoId, platilloId } = req.params;
            const platillo = await updatePlatillosPorPedido(
                pedidoId,
                platilloId,
                req.body
            );
            res.json({
                message: "Pedido actualizado correctamente",
                body: platillo,
            });
        } catch (error) {
            next(error);
        }
    }
);

platillosPorpedidosorUsuarioRouter.delete(
    "/:platilloId",
    validatorHandler(getPlatillosPorPedidoSchema, "params"),
    async (req, res, next) => {
        try {
            const { pedidoId, platilloId } = req.params;
            await deletePlatillosPorPedido(platilloId, pedidoId);
            res.json({ message: "Platillo eliminado correctamente" });
        } catch (error) {
            next(error);
        }
    }
);

module.exports = {
    platillosPorpedidoPorUsuarioRoute,
    platillosPorpedidosorUsuarioRouter,
};
