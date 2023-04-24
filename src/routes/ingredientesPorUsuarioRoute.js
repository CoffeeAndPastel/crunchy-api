const express = require("express");
const { validatorHandler } = require("../middlewares/validator");
const {
    getIngredientesPorUsuario,
    createIngredientePorUsuario,
    deleteIngredientePorUsuario,
} = require("../controllers/ingredientesPorUsuarioController");
const {
    getIngredientesPorUsuarioSchema,
    createIngredientesPorUsuarioSchema,
} = require("../schemas/ingredientesPorUsuarioSchema");

const ingredientesPorUsuarioRoute = "/:usuarioId/ingredientes";
const ingredientesPorUsuarioRouter = express.Router({ mergeParams: true });

ingredientesPorUsuarioRouter.get(
    `/`,
    validatorHandler(getIngredientesPorUsuarioSchema, "params"),
    async (req, res, next) => {
        try {
            const { usuarioId } = req.params;
            const ingredientes = await getIngredientesPorUsuario(usuarioId);
            res.json({
                message: "Ingredientes obtenidos correctamente",
                body: ingredientes,
            });
        } catch (error) {
            next(error);
        }
    }
);

ingredientesPorUsuarioRouter.post(
    `/`,
    validatorHandler(getIngredientesPorUsuarioSchema, "params"),
    validatorHandler(createIngredientesPorUsuarioSchema),
    async (req, res, next) => {
        try {
            const { usuarioId } = req.params;
            const newIngredientePorUsuario = await createIngredientePorUsuario({
                usuarioId,
                ...req.body,
            });
            res.status(201).json({
                message: "Ingrediente creado correctamente",
                body: newIngredientePorUsuario,
            });
        } catch (error) {
            next(error);
        }
    }
);

ingredientesPorUsuarioRouter.delete(
    `/:ingredienteId`,
    validatorHandler(getIngredientesPorUsuarioSchema, "params"),
    async (req, res, next) => {
        try {
            const { usuarioId, ingredienteId } = req.params;
            await deleteIngredientePorUsuario(usuarioId, ingredienteId);
            res.json({ message: "Ingrediente eliminado correctamente" });
        } catch (error) {
            next(error);
        }
    }
);

module.exports = { ingredientesPorUsuarioRoute, ingredientesPorUsuarioRouter };
