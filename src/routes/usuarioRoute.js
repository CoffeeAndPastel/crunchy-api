const boom = require("@hapi/boom");
const express = require("express");

const usuarioRoute = "/usuarios";
const usuarioRouter = express.Router();

usuarioRouter.get("/", async (req, res, next) => {
    setTimeout(() => {
        try {
            const forceError = !Math.round(Math.random());
            if (!forceError) res.send("user route.");
            else throw boom.badRequest("Error forzado");
        } catch (error) {
            next(error);
        }
    }, 2000);
});

module.exports = { usuarioRoute, usuarioRouter };
