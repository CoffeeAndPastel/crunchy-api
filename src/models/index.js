const { Pedido, pedidoSchema } = require("./pedido");
const { Platillo, platilloSchema } = require("./platillo");
const {
    PlatilloPorPedido,
    platillosPorPedidoSchema,
} = require("./platillosPorPedido");
const { Usuario, usuarioSchema } = require("./usuario");

function setupModels(sequelize) {
    //Init
    Usuario.init(usuarioSchema, Usuario.config(sequelize));
    Pedido.init(pedidoSchema, Pedido.config(sequelize));
    Platillo.init(platilloSchema, Platillo.config(sequelize));
    PlatilloPorPedido.init(
        platillosPorPedidoSchema,
        PlatilloPorPedido.config(sequelize)
    );

    //Associates
    Usuario.associate(sequelize.models);
    Pedido.associate(sequelize.models);
    Platillo.associate(sequelize.models);
    PlatilloPorPedido.associate(sequelize.models);
}

module.exports = { setupModels };
