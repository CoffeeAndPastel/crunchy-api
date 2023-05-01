const { Sequelize } = require("sequelize");
const { setupModels } = require("../models");
const { config } = require("./config");

const sequelize = new Sequelize(config.dbUrl, {
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            require: true, // Requerir SSL/TLS
            rejectUnauthorized: false, // Opción para evitar errores de autorización
        },
    },
});

setupModels(sequelize);

sequelize.sync({ force: false });

module.exports = { sequelize };
