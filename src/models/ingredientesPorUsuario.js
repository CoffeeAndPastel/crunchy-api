const { Model, DataTypes } = require("sequelize");

const INGREDIENTE_POR_USUARIO_TABLE = "ingredientes_por_usuario";

const ingredientesPorUsuarioSchema = {
    usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "usuarios",
            key: "id",
        },
    },
    ingredienteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "ingredientes",
            key: "id",
        },
    },
    frequency: {
        type: DataTypes.ENUM("mucha", "poca", "nula"),
        allowNull: false,
    },
};

class IngredientesPorUsuario extends Model {
    static associate(models) {
        this.belongsTo(models.Usuario, {
            as: "usuario",
            foreignKey: "usuarioId",
        });
        this.belongsTo(models.Ingrediente, {
            as: "ingrediente",
            foreignKey: "ingredienteId",
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: INGREDIENTE_POR_USUARIO_TABLE,
            modelName: "IngredientesPorUsuario",
            timestamps: false,
        };
    }
}

module.exports = {
    INGREDIENTE_POR_USUARIO_TABLE,
    ingredientesPorUsuarioSchema,
    IngredientesPorUsuario,
};
