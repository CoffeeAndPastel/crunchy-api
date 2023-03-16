const { Usuario, usuarioSchema } = require("./usuario");

function setupModels(sequelize) {
    Usuario.init(usuarioSchema, Usuario.config(sequelize));

    // Trip.associate(sequelize.models);
}

module.exports = { setupModels };
