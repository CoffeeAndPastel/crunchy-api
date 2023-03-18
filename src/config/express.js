const express = require("express");
const app = express();

//Middlewares
app.use(express.json());

//Routes
app.get("/", (req, res) => {
    const healthCheck = {
        uptime: process.uptime(),
        message: "OK",
        timestamp: Date.now(),
        currentDate: new Date().toISOString(),
        service: "Crunchy 🍔",
        version: "1.0.0",
    };
    try {
        res.status(200).json(healthCheck);
    } catch (e) {
        healthCheck.message = e.message;
        res.status(503).json(healthCheck);
    }
});

module.exports = { app };
