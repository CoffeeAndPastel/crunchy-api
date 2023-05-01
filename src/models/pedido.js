const { Model, DataTypes } = require("sequelize");
const { USUARIO_TABLE } = require("./usuario");

const PEDIDO_TABLE = "pedidos";

const pedidoSchema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    usuarioId: {
        field: "usuario_id",
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: USUARIO_TABLE,
            key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
    },
    state: {
        type: DataTypes.ENUM("ordenando", "enviado", "entregado"),
        defaultValue: "ordenando",
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
    },
};

class Pedido extends Model {
    static associate(models) {
        this.belongsTo(models.Usuario, { as: "usuario" });
        this.hasMany(models.PlatilloPorPedido, {
            as: "platillos",
            foreignKey: "pedidoId",
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: PEDIDO_TABLE,
            modelName: "Pedido",
        };
    }
}

module.exports = { PEDIDO_TABLE, pedidoSchema, Pedido };
