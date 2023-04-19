const express = require("express");
const { validatorHandler } = require("../middlewares/validator");
const {
    getCategoriasPorPlatillo,
    createCategoriasPorPlatillo,
    deleteCategoriasPorPlatillo,
} = require("../controllers/categoriasPorPlatilloController");
const {
    getCategoriasPorPlatilloSchema,
    createCategoriasPorPlatilloSchema,
} = require("../schemas/categoriasPorPlatilloSchema");

const categoriasPorPlatilloRoute = "/:platilloId/categorias";
const categoriasPorPlatilloRouter = express.Router({ mergeParams: true });

categoriasPorPlatilloRouter.get(
    `/`,
    validatorHandler(getCategoriasPorPlatilloSchema, "params"),
    async (req, res, next) => {
        try {
            const { platilloId } = req.params;
            const categorias = await getCategoriasPorPlatillo(platilloId);
            res.json({
                message: "Categorías obtenidas correctamente",
                body: categorias,
            });
        } catch (error) {
            next(error);
        }
    }
);

categoriasPorPlatilloRouter.post(
    `/`,
    validatorHandler(getCategoriasPorPlatilloSchema, "params"),
    validatorHandler(createCategoriasPorPlatilloSchema),
    async (req, res, next) => {
        try {
            const { platilloId } = req.params;
            const newCategoriaPorPlatillo = await createCategoriasPorPlatillo({
                platilloId,
                ...req.body,
            });
            res.status(201).json({
                message: "Categoría creada correctamente",
                body: newCategoriaPorPlatillo,
            });
        } catch (error) {
            next(error);
        }
    }
);

categoriasPorPlatilloRouter.delete(
    `/:categoriaId`,
    validatorHandler(getCategoriasPorPlatilloSchema, "params"),
    async (req, res, next) => {
        try {
            const { platilloId, categoriaId } = req.params;
            await deleteCategoriasPorPlatillo(platilloId, categoriaId);
            res.json({ message: "Categoría eliminada correctamente" });
        } catch (error) {
            next(error);
        }
    }
);

module.exports = { categoriasPorPlatilloRoute, categoriasPorPlatilloRouter };
