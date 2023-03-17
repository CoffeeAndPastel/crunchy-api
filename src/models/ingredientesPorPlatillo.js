const { Model, DataTypes } = require("sequelize");
const { INGREDIENTE_TABLE } = require("./ingrediente");
const { PLATILLO_TABLE } = require("./platillo");

const INGREDIENTES_POR_PLATILLO_TABLE = "ingredientes_por_platillo";

const ingredientesPorPlatilloSchema = {
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
    ingredienteId: {
        field: "ingrediente_id",
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: INGREDIENTE_TABLE,
            key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
    isOptional: {
        field: "is_optional",
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
};

class IngredientesPorPlatillo extends Model {
    static associate(models) {
        this.belongsTo(models.Platillo, { as: "platillo" });
        this.belongsTo(models.Ingrediente, { as: "ingrediente" });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: INGREDIENTES_POR_PLATILLO_TABLE,
            modelName: "IngredientesPorPlatillo",
            timestamps: false,
        };
    }
}

module.exports = {
    INGREDIENTES_POR_PLATILLO_TABLE,
    ingredientesPorPlatilloSchema,
    IngredientesPorPlatillo,
};
