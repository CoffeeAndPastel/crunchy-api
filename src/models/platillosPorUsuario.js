const { Model, DataTypes } = require("sequelize");
const { USUARIO_TABLE } = require("./usuario");
const { PLATILLO_TABLE } = require("./platillo");

const PLATILLOS_POR_USUARIO_TABLE = "platillos_por_usuario";

const platillosPorUsuarioSchema = {
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

class PlatilloPorUsuario extends Model {
    static associate(models) {
        this.belongsTo(models.Usuario, { as: "usuario" });
        this.belongsTo(models.Platillo, { as: "platillo" });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: PLATILLOS_POR_USUARIO_TABLE,
            modelName: "PlatilloPorUsuario",
            timestamps: false,
        };
    }
}

module.exports = {
    PLATILLOS_POR_USUARIO_TABLE,
    platillosPorUsuarioSchema,
    PlatilloPorUsuario,
};
