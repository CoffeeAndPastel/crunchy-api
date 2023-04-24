const express = require("express");
const { validatorHandler } = require("../middlewares/validator");
const {
    getEtiquetasPorPlatillo,
    createEtiquetasPorPlatillo,
    deleteEtiquetasPorPlatillo,
} = require("../controllers/etiquetasPorPlatilloController");
const {
    getEtiquetasPorPlatilloSchema,
    createEtiquetasPorPlatilloSchema,
} = require("../schemas/etiquetasPorPlatilloSchema");

const etiquetasPorPlatilloRoute = "/:platilloId/etiquetas";
const etiquetasPorPlatilloRouter = express.Router({ mergeParams: true });

etiquetasPorPlatilloRouter.get(
    `/`,
    validatorHandler(getEtiquetasPorPlatilloSchema, "params"),
    async (req, res, next) => {
        try {
            const { platilloId } = req.params;
            const etiquetas = await getEtiquetasPorPlatillo(platilloId);
            res.json({
                message: "Etiquetas obtenidas correctamente",
                body: etiquetas,
            });
        } catch (error) {
            next(error);
        }
    }
);

etiquetasPorPlatilloRouter.post(
    `/`,
    validatorHandler(getEtiquetasPorPlatilloSchema, "params"),
    validatorHandler(createEtiquetasPorPlatilloSchema),
    async (req, res, next) => {
        try {
            const { platilloId } = req.params;
            const newEtiquetaPorPlatillo = await createEtiquetasPorPlatillo({
                platilloId,
                ...req.body,
            });
            res.status(201).json({
                message: "Etiqueta creada correctamente",
                body: newEtiquetaPorPlatillo,
            });
        } catch (error) {
            next(error);
        }
    }
);

etiquetasPorPlatilloRouter.delete(
    `/:etiquetaId`,
    validatorHandler(getEtiquetasPorPlatilloSchema, "params"),
    async (req, res, next) => {
        try {
            const { platilloId, etiquetaId } = req.params;
            await deleteEtiquetasPorPlatillo(platilloId, etiquetaId);
            res.json({ message: "Etiqueta eliminada correctamente" });
        } catch (error) {
            next(error);
        }
    }
);

module.exports = { etiquetasPorPlatilloRoute, etiquetasPorPlatilloRouter };
