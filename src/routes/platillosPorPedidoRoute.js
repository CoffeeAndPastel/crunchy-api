const express = require("express");
const { validatorHandler } = require("../middlewares/validator");
const {
    getPlatilloPorPedidoSchema,
    createPlatilloPorPedidoSchema,
    updatePlatilloPorPedidoSchema,
} = require("../schemas/platillosPorPedidoSchema");
const {
    getAllPlatillosPorPedido,
    getPlatilloPorPedidoById,
    createPlatilloPorPedido,
    updatePlatilloPorPedido,
    deletePlatilloPorPedido,
} = require("../controllers/platillosPorPedidoController");

const platilloPorPedidoRoute = "/platillos-por-pedido";
const platilloPorPedidoRouter = express.Router();

platilloPorPedidoRouter.get("/", async (req, res, next) => {
    try {
        const platillosPorPedido = await getAllPlatillosPorPedido();
        res.json({
            message: "Platillos por pedido obtenidos correctamente",
            body: platillosPorPedido,
        });
    } catch (error) {
        next(error);
    }
});

platilloPorPedidoRouter.get(
    "/:id",
    validatorHandler(getPlatilloPorPedidoSchema, "params"),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const platilloPorPedido = await getPlatilloPorPedidoById(id);
            res.json({
                message: "Platillo por pedido obtenido correctamente",
                body: platilloPorPedido,
            });
        } catch (error) {
            next(error);
        }
    }
);

platilloPorPedidoRouter.post(
    "/",
    validatorHandler(createPlatilloPorPedidoSchema),
    async (req, res, next) => {
        try {
            const platilloPorPedido = await createPlatilloPorPedido(req.body);
            res.status(201).json({
                message: "Platillo por pedido creado correctamente",
                body: platilloPorPedido,
            });
        } catch (error) {
            next(error);
        }
    }
);

platilloPorPedidoRouter.patch(
    "/:id",
    validatorHandler(updatePlatilloPorPedidoSchema),
    validatorHandler(getPlatilloPorPedidoSchema, "params"),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const platilloPorPedido = await updatePlatilloPorPedido(
                id,
                req.body
            );
            res.json({
                message: "Platillo por pedido actualizado correctamente",
                body: platilloPorPedido,
            });
        } catch (error) {
            next(error);
        }
    }
);

platilloPorPedidoRouter.delete(
    "/:id",
    validatorHandler(getPlatilloPorPedidoSchema, "params"),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            await deletePlatilloPorPedido(id);
            res.json({
                message: "Platillo por pedido eliminado correctamente",
            });
        } catch (error) {
            next(error);
        }
    }
);

module.exports = { platilloPorPedidoRoute, platilloPorPedidoRouter };
