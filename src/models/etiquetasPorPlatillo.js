const { Model, DataTypes } = require("sequelize");
const { ETIQUETA_TABLE } = require("./etiqueta");
const { PLATILLO_TABLE } = require("./platillo");

const ETIQUETAS_POR_PLATILLO_TABLE = "etiquetas_por_platillo";

const etiquetasPorPlatilloSchema = {
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
    etiquetaId: {
        field: "etiqueta_id",
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: ETIQUETA_TABLE,
            key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
};

class EtiquetasPorPlatillo extends Model {
    static associate(models) {
        this.belongsTo(models.Platillo, { as: "platillo" });
        this.belongsTo(models.Etiqueta, { as: "etiqueta" });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: ETIQUETAS_POR_PLATILLO_TABLE,
            modelName: "EtiquetasPorPlatillo",
            timestamps: false,
        };
    }
}

module.exports = {
    ETIQUETAS_POR_PLATILLO_TABLE,
    etiquetasPorPlatilloSchema,
    EtiquetasPorPlatillo,
};
