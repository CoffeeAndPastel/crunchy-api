const express = require("express");
const { validatorHandler } = require("../middlewares/validator");
const {
    getCategoriaSchema,
    createCategoriaSchema,
    updateCategoriaSchema,
    createCategoriasSchema,
} = require("../schemas/categoriaSchema");
const {
    getAllCategorias,
    getCategoriaById,
    createCategoria,
    updateCategoria,
    deleteCategoria,
    createCategorias,
} = require("../controllers/categoriaController");

const categoriaRoute = "/categorias";
const categoriaRouter = express.Router();

categoriaRouter.get("/", async (req, res, next) => {
    try {
        const categorias = await getAllCategorias();
        res.json({
            message: "Categorías obtenidas correctamente",
            body: categorias,
        });
    } catch (error) {
        next(error);
    }
});

categoriaRouter.get(
    "/:id",
    validatorHandler(getCategoriaSchema, "params"),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const categoria = await getCategoriaById(id);
            res.json({
                message: "Categoría obtenida correctamente",
                body: categoria,
            });
        } catch (error) {
            next(error);
        }
    }
);

categoriaRouter.post(
    "/",
    validatorHandler(createCategoriaSchema),
    async (req, res, next) => {
        try {
            const categoria = await createCategoria(req.body);
            res.status(201).json({
                message: "Categoría creada correctamente",
                body: categoria,
            });
        } catch (error) {
            next(error);
        }
    }
);

categoriaRouter.post(
    "/multiple",
    validatorHandler(createCategoriasSchema),
    async (req, res, next) => {
        try {
            const categoria = await createCategorias(req.body);
            res.status(201).json({
                message: "Categoría creada correctamente",
                body: categoria,
            });
        } catch (error) {
            next(error);
        }
    }
);

categoriaRouter.patch(
    "/:id",
    validatorHandler(updateCategoriaSchema),
    validatorHandler(getCategoriaSchema, "params"),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const categoria = await updateCategoria(id, req.body);
            res.json({
                message: "Categoría actualizada correctamente",
                body: categoria,
            });
        } catch (error) {
            next(error);
        }
    }
);

categoriaRouter.delete(
    "/:id",
    validatorHandler(getCategoriaSchema, "params"),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            await deleteCategoria(id);
            res.json({ message: "Categoría eliminada correctamente" });
        } catch (error) {
            next(error);
        }
    }
);

module.exports = { categoriaRoute, categoriaRouter };
