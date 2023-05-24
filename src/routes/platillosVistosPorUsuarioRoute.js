const express = require("express");
const { validatorHandler } = require("../middlewares/validator");
const {
    getPlatillosPorUsuarioSchema,
    createPlatilloPorUsuarioSchema,
} = require("../schemas/platillosPorUsuarioSchema");
const {
    getPlatillosVistosPorUsuario,
    createPlatillosVistosPorUsuario,
    deletePlatillosVistosPorUsuario,
} = require("../controllers/platillosVistosPorUsuarioController");

const platillosVistosPorUsuarioRoute = "/:usuarioId/platillos/vistos";
const platillosVistosPorUsuarioRouter = express.Router({ mergeParams: true });

platillosVistosPorUsuarioRouter.get(
    `/`,
    validatorHandler(getPlatillosPorUsuarioSchema, "params"),
    async (req, res, next) => {
        try {
            const { usuarioId } = req.params;
            const platillos = await getPlatillosVistosPorUsuario(usuarioId);
            res.json({
                message: "Platillos obtenidos correctamente",
                body: platillos,
            });
        } catch (error) {
            next(error);
        }
    }
);

platillosVistosPorUsuarioRouter.post(
    `/`,
    validatorHandler(getPlatillosPorUsuarioSchema, "params"),
    validatorHandler(createPlatilloPorUsuarioSchema),
    async (req, res, next) => {
        try {
            const { usuarioId } = req.params;
            const newPlatillosVistosPorUsuario =
                await createPlatillosVistosPorUsuario({
                    usuarioId,
                    ...req.body,
                });
            res.status(201).json({
                message: "Platillo creado correctamente",
                body: newPlatillosVistosPorUsuario,
            });
        } catch (error) {
            next(error);
        }
    }
);

platillosVistosPorUsuarioRouter.delete(
    `/:platilloId`,
    validatorHandler(getPlatillosPorUsuarioSchema, "params"),
    async (req, res, next) => {
        try {
            const { usuarioId, platilloId } = req.params;
            await deletePlatillosVistosPorUsuario(usuarioId, platilloId);
            res.json({ message: "Platillo eliminado correctamente" });
        } catch (error) {
            next(error);
        }
    }
);

module.exports = {
    platillosVistosPorUsuarioRoute,
    platillosVistosPorUsuarioRouter,
};
