const express = require("express");
const { etiquetaRoute, etiquetaRouter } = require("./etiquetaRoute");
const { localRoute, localRouter } = require("./localRoute");
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

module.exports = { route, router };
