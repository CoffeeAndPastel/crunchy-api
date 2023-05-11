const express = require("express");
const { validatorHandler } = require("../middlewares/validator");
const {
    getEtiquetaSchema,
    createEtiquetaSchema,
    updateEtiquetaSchema,
    createEtiquetasSchema,
} = require("../schemas/etiquetaSchema");
const {
    getAllEtiquetas,
    getEtiquetaById,
    createEtiqueta,
    updateEtiqueta,
    deleteEtiqueta,
    createEtiquetas,
} = require("../controllers/etiquetaController");

const etiquetaRoute = "/etiquetas";
const etiquetaRouter = express.Router();

etiquetaRouter.get("/", async (req, res, next) => {
    try {
        const etiquetas = await getAllEtiquetas();
        res.json({
            message: "Etiquetas obtenidas correctamente",
            body: etiquetas,
        });
    } catch (error) {
        next(error);
    }
});

etiquetaRouter.get(
    "/:id",
    validatorHandler(getEtiquetaSchema, "params"),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const etiqueta = await getEtiquetaById(id);
            res.json({
                message: "Etiqueta obtenida correctamente",
                body: etiqueta,
            });
        } catch (error) {
            next(error);
        }
    }
);

etiquetaRouter.post(
    "/",
    validatorHandler(createEtiquetaSchema),
    async (req, res, next) => {
        try {
            const etiqueta = await createEtiqueta(req.body);
            res.status(201).json({
                message: "Etiqueta creada correctamente",
                body: etiqueta,
            });
        } catch (error) {
            next(error);
        }
    }
);

etiquetaRouter.post(
    "/multiple",
    validatorHandler(createEtiquetasSchema),
    async (req, res, next) => {
        try {
            const etiquetas = await createEtiquetas(req.body);
            res.status(201).json({
                message: "Etiquetas creadas correctamente",
                body: etiquetas,
            });
        } catch (error) {
            next(error);
        }
    }
);

etiquetaRouter.patch(
    "/:id",
    validatorHandler(getEtiquetaSchema, "params"),
    validatorHandler(updateEtiquetaSchema),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const etiqueta = await updateEtiqueta(id, req.body);
            res.json({
                message: "Etiqueta actualizada correctamente",
                body: etiqueta,
            });
        } catch (error) {
            next(error);
        }
    }
);

etiquetaRouter.delete(
    "/:id",
    validatorHandler(getEtiquetaSchema, "params"),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            await deleteEtiqueta(id);
            res.json({ message: "Etiqueta eliminada correctamente" });
        } catch (error) {
            next(error);
        }
    }
);

module.exports = { etiquetaRoute, etiquetaRouter };
