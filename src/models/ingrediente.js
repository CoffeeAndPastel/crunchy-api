const { Model, DataTypes } = require("sequelize");

const INGREDIENTE_TABLE = "ingredientes";

const ingredienteSchema = {
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

class Ingrediente extends Model {
    static associate(models) {
        this.hasMany(models.IngredientesPorPlatillo, {
            as: "ingredientesPorPlatillo",
            foreignKey: "ingredienteId",
        });
        this.hasMany(models.IngredientePorUsuario, {
            as: "ingredientePorUsuario",
            foreignKey: "ingredienteId",
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: INGREDIENTE_TABLE,
            modelName: "Ingrediente",
        };
    }
}

module.exports = { INGREDIENTE_TABLE, ingredienteSchema, Ingrediente };
