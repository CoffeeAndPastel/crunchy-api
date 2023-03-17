const { Model, DataTypes } = require("sequelize");
const { CATEGORIA_TABLE } = require("./categoria");
const { PLATILLO_TABLE } = require("./platillo");

const CATEGORIAS_POR_PLATILLO_TABLE = "categorias_por_platillo";

const categoriasPorPlatilloSchema = {
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
    categoriaId: {
        field: "categoria_id",
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: CATEGORIA_TABLE,
            key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
};

class CategoriasPorPlatillo extends Model {
    static associate(models) {
        this.belongsTo(models.Categoria, { as: "categoria" });
        this.belongsTo(models.Platillo, { as: "platillo" });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: CATEGORIAS_POR_PLATILLO_TABLE,
            modelName: "CategoriasPorPlatillo",
            timestamps: false,
        };
    }
}

module.exports = {
    CATEGORIAS_POR_PLATILLO_TABLE,
    categoriasPorPlatilloSchema,
    CategoriasPorPlatillo,
};
