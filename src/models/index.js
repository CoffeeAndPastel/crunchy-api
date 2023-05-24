const { Categoria, categoriaSchema } = require("./categoria");
const {
    CategoriasPorPlatillo,
    categoriasPorPlatilloSchema,
} = require("./categoriasPorPlatillo");
const { Etiqueta, etiquetaSchema } = require("./etiqueta");
const {
    EtiquetasPorPlatillo,
    etiquetasPorPlatilloSchema,
} = require("./etiquetasPorPlatillo");
const { Ingrediente, ingredienteSchema } = require("./ingrediente");
const {
    IngredientesPorUsuario,
    ingredientesPorUsuarioSchema,
} = require("./ingredientesPorUsuario");
const {
    IngredientesPorPlatillo,
    ingredientesPorPlatilloSchema,
} = require("./ingredientesPorPlatillo");
const { Local, localSchema } = require("./local");
const { Pedido, pedidoSchema } = require("./pedido");
const { Platillo, platilloSchema } = require("./platillo");
const {
    PlatilloPorPedido,
    platillosPorPedidoSchema,
} = require("./platillosPorPedido");
const {
    PlatilloPorUsuario,
    platillosPorUsuarioSchema,
} = require("./platillosPorUsuario");
const { Usuario, usuarioSchema } = require("./usuario");
const {
    PlatillosVistosPorUsuario,
    platillosVistosPorUsuarioSchema,
} = require("./platillosVistosPorUsuario");

function setupModels(sequelize) {
    //Init
    Usuario.init(usuarioSchema, Usuario.config(sequelize));
    Pedido.init(pedidoSchema, Pedido.config(sequelize));
    Platillo.init(platilloSchema, Platillo.config(sequelize));
    PlatilloPorPedido.init(
        platillosPorPedidoSchema,
        PlatilloPorPedido.config(sequelize)
    );
    PlatilloPorUsuario.init(
        platillosPorUsuarioSchema,
        PlatilloPorUsuario.config(sequelize)
    );
    PlatillosVistosPorUsuario.init(
        platillosVistosPorUsuarioSchema,
        PlatillosVistosPorUsuario.config(sequelize)
    );
    Local.init(localSchema, Local.config(sequelize));
    Categoria.init(categoriaSchema, Categoria.config(sequelize));
    CategoriasPorPlatillo.init(
        categoriasPorPlatilloSchema,
        CategoriasPorPlatillo.config(sequelize)
    );
    Etiqueta.init(etiquetaSchema, Etiqueta.config(sequelize));
    EtiquetasPorPlatillo.init(
        etiquetasPorPlatilloSchema,
        EtiquetasPorPlatillo.config(sequelize)
    );
    Ingrediente.init(ingredienteSchema, Ingrediente.config(sequelize));
    IngredientesPorPlatillo.init(
        ingredientesPorPlatilloSchema,
        IngredientesPorPlatillo.config(sequelize)
    );
    IngredientesPorUsuario.init(
        ingredientesPorUsuarioSchema,
        IngredientesPorUsuario.config(sequelize)
    );

    //Associates
    Usuario.associate(sequelize.models);
    Pedido.associate(sequelize.models);
    Platillo.associate(sequelize.models);
    PlatilloPorPedido.associate(sequelize.models);
    PlatilloPorUsuario.associate(sequelize.models);
    PlatillosVistosPorUsuario.associate(sequelize.models);
    Local.associate(sequelize.models);
    Categoria.associate(sequelize.models);
    CategoriasPorPlatillo.associate(sequelize.models);
    Etiqueta.associate(sequelize.models);
    EtiquetasPorPlatillo.associate(sequelize.models);
    Ingrediente.associate(sequelize.models);
    IngredientesPorPlatillo.associate(sequelize.models);
    IngredientesPorUsuario.associate(sequelize.models);
}

module.exports = { setupModels };
