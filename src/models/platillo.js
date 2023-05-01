const { Model, DataTypes } = require("sequelize");
const { LOCAL_TABLE } = require("./local");

const PLATILLO_TABLE = "platillos";

const platilloSchema = {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    localId: {
        field: "local_id",
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: LOCAL_TABLE,
            key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
    photoUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "photo_url",
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
};

class Platillo extends Model {
    static associate(models) {
        this.belongsTo(models.Local, { as: "local" });
        this.hasMany(models.PlatilloPorPedido, {
            as: "pedidos",
            foreignKey: "platilloId",
        });
        this.hasMany(models.CategoriasPorPlatillo, {
            as: "categorias",
            foreignKey: "platilloId",
        });
        this.hasMany(models.EtiquetasPorPlatillo, {
            as: "etiquetas",
            foreignKey: "platilloId",
        });
        this.hasMany(models.IngredientesPorPlatillo, {
            as: "ingredientes",
            foreignKey: "platilloId",
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: PLATILLO_TABLE,
            modelName: "Platillo",
        };
    }
}

module.exports = { PLATILLO_TABLE, platilloSchema, Platillo };
