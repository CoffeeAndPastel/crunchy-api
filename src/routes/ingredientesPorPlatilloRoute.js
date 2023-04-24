const express = require("express");
const { validatorHandler } = require("../middlewares/validator");
const {
    getIngredientesPorPlatillo,
    createIngredientesPorPlatillo,
    deleteIngredientesPorPlatillo,
} = require("../controllers/ingredientesPorPlatilloController");
const {
    getIngredientesPorPlatilloSchema,
    createIngredientesPorPlatilloSchema,
} = require("../schemas/ingredientesPorPlatilloSchema");

const ingredientesPorPlatilloRoute = "/:platilloId/ingredientes";
const ingredientesPorPlatilloRouter = express.Router({ mergeParams: true });

ingredientesPorPlatilloRouter.get(
    "/",
    validatorHandler(getIngredientesPorPlatilloSchema, "params"),
    async (req, res, next) => {
        try {
            const { platilloId } = req.params;
            const ingredientes = await getIngredientesPorPlatillo(platilloId);
            res.json({
                message: "Ingredientes obtenidos correctamente",
                body: ingredientes,
            });
        } catch (error) {
            next(error);
        }
    }
);

ingredientesPorPlatilloRouter.post(
    "/",
    validatorHandler(getIngredientesPorPlatilloSchema, "params"),
    validatorHandler(createIngredientesPorPlatilloSchema),
    async (req, res, next) => {
        try {
            const { platilloId } = req.params;
            const newIngredientePorPlatillo =
                await createIngredientesPorPlatillo({
                    platilloId,
                    ...req.body,
                });
            res.status(201).json({
                message: "Ingrediente creado correctamente",
                body: newIngredientePorPlatillo,
            });
        } catch (error) {
            next(error);
        }
    }
);

ingredientesPorPlatilloRouter.delete(
    "/:ingredienteId",
    validatorHandler(getIngredientesPorPlatilloSchema, "params"),
    async (req, res, next) => {
        try {
            const { platilloId, ingredienteId } = req.params;
            await deleteIngredientesPorPlatillo(platilloId, ingredienteId);
            res.json({ message: "Ingrediente eliminado correctamente" });
        } catch (error) {
            next(error);
        }
    }
);

module.exports = {
    ingredientesPorPlatilloRoute,
    ingredientesPorPlatilloRouter,
};
