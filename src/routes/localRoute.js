const express = require("express");
const { validatorHandler } = require("../middlewares/validator");
const {
    getLocalSchema,
    createLocalSchema,
    updateLocalSchema,
    createLocalesSchema,
} = require("../schemas/localSchema");
const {
    getAllLocales,
    getLocalById,
    createLocal,
    updateLocal,
    deleteLocal,
    createLocales,
} = require("../controllers/localController");

const localRoute = "/locales";
const localRouter = express.Router();

localRouter.get("/", async (req, res, next) => {
    try {
        const locales = await getAllLocales();
        res.json({
            message: "Locales obtenidos correctamente",
            body: locales,
        });
    } catch (error) {
        next(error);
    }
});

localRouter.get(
    "/:id",
    validatorHandler(getLocalSchema, "params"),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const local = await getLocalById(id);
            res.json({
                message: "Local obtenido correctamente",
                body: local,
            });
        } catch (error) {
            next(error);
        }
    }
);

localRouter.post(
    "/",
    validatorHandler(createLocalSchema),
    async (req, res, next) => {
        try {
            const local = await createLocal(req.body);
            res.status(201).json({
                message: "Local creado correctamente",
                body: local,
            });
        } catch (error) {
            next(error);
        }
    }
);

localRouter.post(
    "/multiple",
    validatorHandler(createLocalesSchema),
    async (req, res, next) => {
        try {
            const locales = await createLocales(req.body);
            res.status(201).json({
                message: "Local creado correctamente",
                body: locales,
            });
        } catch (error) {
            next(error);
        }
    }
);

localRouter.patch(
    "/:id",
    validatorHandler(updateLocalSchema),
    validatorHandler(getLocalSchema, "params"),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const local = await updateLocal(id, req.body);
            res.json({
                message: "Local actualizado correctamente",
                body: local,
            });
        } catch (error) {
            next(error);
        }
    }
);

localRouter.delete(
    "/:id",
    validatorHandler(getLocalSchema, "params"),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            await deleteLocal(id);
            res.json({ message: "Local eliminado correctamente" });
        } catch (error) {
            next(error);
        }
    }
);

module.exports = { localRoute, localRouter };
