const express = require("express");
const { validatorHandler } = require("../middlewares/validator");
const {
    getUsuarioSchema,
    createUsuarioSchema,
    updateUsuarioSchema,
} = require("../schemas/usuarioSchema");
const {
    getAllUsuarios,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    deleteUsuario,
} = require("../controllers/usuarioController");

const usuarioRoute = "/usuarios";
const usuarioRouter = express.Router();

usuarioRouter.get("/", async (req, res, next) => {
    try {
        const usuarios = await getAllUsuarios();
        res.json({
            message: "Usuarios obtenidos correctamente",
            body: usuarios,
        });
    } catch (error) {
        next(error);
    }
});

usuarioRouter.get(
    "/:id",
    validatorHandler(getUsuarioSchema, "params"),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const usuario = await getUsuarioById(id);
            res.json({
                message: "Usuario obtenido correctamente",
                body: usuario,
            });
        } catch (error) {
            next(error);
        }
    }
);

usuarioRouter.post(
    "/",
    validatorHandler(createUsuarioSchema),
    async (req, res, next) => {
        try {
            const usuario = await createUsuario(req.body);
            res.status(201).json({
                message: "Usuario creado correctamente",
                body: usuario,
            });
        } catch (error) {
            next(error);
        }
    }
);

usuarioRouter.patch(
    "/:id",
    validatorHandler(updateUsuarioSchema),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const usuario = await updateUsuario(id, req.body);
            res.json({
                message: "Usuario actualizado correctamente",
                body: usuario,
            });
        } catch (error) {
            next(error);
        }
    }
);

usuarioRouter.delete(
    "/:id",
    validatorHandler(getUsuarioSchema, "params"),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            await deleteUsuario(id);
            res.json({ message: "Usuario eliminado correctamente" });
        } catch (error) {
            next(error);
        }
    }
);

module.exports = { usuarioRoute, usuarioRouter };
