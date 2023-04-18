const express = require("express");
const { validatorHandler } = require("../middlewares/validator");
const {
    getIngredienteSchema,
    createIngredienteSchema,
    updateIngredienteSchema,
} = require("../schemas/ingredienteSchema");
const {
    getAllIngredientes,
    getIngredienteById,
    createIngrediente,
    updateIngrediente,
    deleteIngrediente,
} = require("../controllers/ingredienteController");

const ingredienteRoute = "/ingredientes";
const ingredienteRouter = express.Router();

ingredienteRouter.get("/", async (req, res, next) => {
    try {
        const ingredientes = await getAllIngredientes();
        res.json({
            message: "Ingredientes obtenidos correctamente",
            body: ingredientes,
        });
    } catch (error) {
        next(error);
    }
});

ingredienteRouter.get(
    "/:id",
    validatorHandler(getIngredienteSchema, "params"),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const ingrediente = await getIngredienteById(id);
            res.json({
                message: "Ingrediente obtenido correctamente",
                body: ingrediente,
            });
        } catch (error) {
            next(error);
        }
    }
);

ingredienteRouter.post(
    "/",
    validatorHandler(createIngredienteSchema),
    async (req, res, next) => {
        try {
            const ingrediente = await createIngrediente(req.body);
            res.status(201).json({
                message: "Ingrediente creado correctamente",
                body: ingrediente,
            });
        } catch (error) {
            next(error);
        }
    }
);

ingredienteRouter.patch(
    "/:id",
    validatorHandler(updateIngredienteSchema),
    validatorHandler(getIngredienteSchema, "params"),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const ingrediente = await updateIngrediente(id, req.body);
            res.json({
                message: "Ingrediente actualizado correctamente",
                body: ingrediente,
            });
        } catch (error) {
            next(error);
        }
    }
);

ingredienteRouter.delete(
    "/:id",
    validatorHandler(getIngredienteSchema, "params"),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            await deleteIngrediente(id);
            res.json({ message: "Ingrediente eliminado correctamente" });
        } catch (error) {
            next(error);
        }
    }
);

module.exports = { ingredienteRoute, ingredienteRouter };
