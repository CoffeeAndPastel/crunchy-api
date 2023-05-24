const { Model, DataTypes } = require("sequelize");
const { USUARIO_TABLE } = require("./usuario");
const { PLATILLO_TABLE } = require("./platillo");

const PLATILLOS_VISTOS_POR_USUARIO_TABLE = "platillos_vistos_por_usuario";

const platillosVistosPorUsuarioSchema = {
    usuarioId: {
        field: "usuario_id",
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: USUARIO_TABLE,
            key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
    platilloId: {
        field: "platillo_id",
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: PLATILLO_TABLE,
            key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
};

class PlatillosVistosPorUsuario extends Model {
    static associate(models) {
        this.belongsTo(models.Usuario, { as: "usuario" });
        this.belongsTo(models.Platillo, { as: "platillo" });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: PLATILLOS_VISTOS_POR_USUARIO_TABLE,
            modelName: "PlatillosVistosPorUsuario",
            timestamps: false,
        };
    }
}

module.exports = {
    PLATILLOS_VISTOS_POR_USUARIO_TABLE,
    platillosVistosPorUsuarioSchema,
    PlatillosVistosPorUsuario,
};
