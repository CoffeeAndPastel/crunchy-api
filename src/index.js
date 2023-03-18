const { sequelize } = require("./config/sequelize");
const { config } = require("./config/config");
const { app } = require("./config/express");

const PORT = config.port || 3000;

sequelize
    .authenticate()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Servidor iniciado en el puerto ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Error al iniciar la base de datos: ", err);
    });
