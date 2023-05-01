const { Model, DataTypes } = require("sequelize");
const { PEDIDO_TABLE } = require("./pedido");
const { PLATILLO_TABLE } = require("./platillo");

const PLATILLOS_POR_PEDIDO_TABLE = "platillos_por_pedido";

const platillosPorPedidoSchema = {
    pedidoId: {
        field: "pedido_id",
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: PEDIDO_TABLE,
            key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
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
    amount: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 1,
    },
};

class PlatilloPorPedido extends Model {
    static associate(models) {
        this.belongsTo(models.Pedido, { as: "pedido", foreignKey: "pedidoId" });
        this.belongsTo(models.Platillo, {
            as: "platillo",
            foreignKey: "platilloId",
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: PLATILLOS_POR_PEDIDO_TABLE,
            modelName: "PlatilloPorPedido",
            timestamps: false,
        };
    }
}

module.exports = {
    PLATILLOS_POR_PEDIDO_TABLE,
    platillosPorPedidoSchema,
    PlatilloPorPedido,
};
