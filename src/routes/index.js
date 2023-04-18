const express = require("express");
const { categoriaRoute, categoriaRouter } = require("./categoriaRoute");
const { etiquetaRoute, etiquetaRouter } = require("./etiquetaRoute");
const { ingredienteRoute, ingredienteRouter } = require("./ingredienteRoute");
const { localRoute, localRouter } = require("./localRoute");
const { platilloRoute, platilloRouter } = require("./platilloRoute");
const { usuarioRoute, usuarioRouter } = require("./usuarioRoute");

const route = "/api/v1";
const router = express.Router();

//Routes
router.get("/", async (req, res, next) => {
    try {
        res.json({
            messaje: "Hello main route",
        });
    } catch (error) {
        next(error);
    }
});

router.use(usuarioRoute, usuarioRouter);
router.use(localRoute, localRouter);
router.use(etiquetaRoute, etiquetaRouter);
router.use(platilloRoute, platilloRouter);
router.use(ingredienteRoute, ingredienteRouter);
router.use(categoriaRoute, categoriaRouter);

module.exports = { route, router };
