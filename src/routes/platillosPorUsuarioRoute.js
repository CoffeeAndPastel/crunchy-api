const express = require("express");
const { validatorHandler } = require("../middlewares/validator");
const {
    getPlatillosPorUsuario,
    createPlatilloPorUsuario,
    deletePlatilloPorUsuario,
} = require("../controllers/platillosPorUsuarioController");
const {
    getPlatillosPorUsuarioSchema,
    createPlatilloPorUsuarioSchema,
} = require("../schemas/platillosPorUsuarioSchema");

const platillosPorUsuarioRoute = "/:usuarioId/platillos";
const platillosPorUsuarioRouter = express.Router({ mergeParams: true });

platillosPorUsuarioRouter.get(
    `/`,
    validatorHandler(getPlatillosPorUsuarioSchema, "params"),
    async (req, res, next) => {
        try {
            const { usuarioId } = req.params;
            const platillos = await getPlatillosPorUsuario(usuarioId);
            res.json({
                message: "Platillos obtenidos correctamente",
                body: platillos,
            });
        } catch (error) {
            next(error);
        }
    }
);

platillosPorUsuarioRouter.post(
    `/`,
    validatorHandler(getPlatillosPorUsuarioSchema, "params"),
    validatorHandler(createPlatilloPorUsuarioSchema),
    async (req, res, next) => {
        try {
            const { usuarioId } = req.params;
            const newPlatilloPorUsuario = await createPlatilloPorUsuario({
                usuarioId,
                ...req.body,
            });
            res.status(201).json({
                message: "Platillo creado correctamente",
                body: newPlatilloPorUsuario,
            });
        } catch (error) {
            next(error);
        }
    }
);

platillosPorUsuarioRouter.delete(
    `/:platilloId`,
    validatorHandler(getPlatillosPorUsuarioSchema, "params"),
    async (req, res, next) => {
        try {
            const { usuarioId, platilloId } = req.params;
            await deletePlatilloPorUsuario(usuarioId, platilloId);
            res.json({ message: "Platillo eliminado correctamente" });
        } catch (error) {
            next(error);
        }
    }
);

module.exports = { platillosPorUsuarioRoute, platillosPorUsuarioRouter };
