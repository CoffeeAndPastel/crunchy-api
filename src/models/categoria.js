const { Model, DataTypes } = require("sequelize");

const CATEGORIA_TABLE = "categorias";

const categoriaSchema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
};

class Categoria extends Model {
    static associate(models) {
        this.hasMany(models.CategoriasPorPlatillo, {
            as: "categoriasPorPlatillo",
            foreignKey: "categoriaId",
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: CATEGORIA_TABLE,
            modelName: "Categoria",
        };
    }
}

module.exports = { CATEGORIA_TABLE, categoriaSchema, Categoria };
