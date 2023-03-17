const { Model, DataTypes } = require("sequelize");

const ETIQUETA_TABLE = "etiquetas";

const etiquetaSchema = {
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

class Etiqueta extends Model {
    static associate(models) {
        this.hasMany(models.EtiquetasPorPlatillo, {
            as: "etiquetasPorPlatillo",
            foreignKey: "etiquetaId",
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: ETIQUETA_TABLE,
            modelName: "Etiqueta",
        };
    }
}

module.exports = { ETIQUETA_TABLE, etiquetaSchema, Etiqueta };
