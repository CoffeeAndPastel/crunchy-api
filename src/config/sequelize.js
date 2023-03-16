const { Sequelize } = require("sequelize");
const { setupModels } = require("../models");
const { config } = require("./config");

const sequelize = new Sequelize(config.dbUrl, {
    dialect: "postgres",
});

setupModels(sequelize);

sequelize.sync({ force: true });

module.exports = sequelize;
