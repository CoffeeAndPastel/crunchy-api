const { Model, DataTypes } = require("sequelize");

const USUARIO_TABLE = "usuarios";

const usuarioSchema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "last_name",
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    photoUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "photo_url",
    },
};

class Usuario extends Model {
    static associate(models) {
        this.hasMany(models.Pedido, {
            as: "pedidos",
            foreignKey: "usuarioId",
        });
        this.hasMany(models.IngredientesPorUsuario, {
            as: "ingredientes",
            foreignKey: "usuarioId",
        });
        this.hasMany(models.PlatilloPorUsuario, {
            as: "platillos",
            foreignKey: "usuarioId",
        });
        this.hasMany(models.PlatillosVistosPorUsuario, {
            as: "platillosVistos",
            foreignKey: "usuarioId",
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: USUARIO_TABLE,
            modelName: "Usuario",
        };
    }
}

module.exports = { USUARIO_TABLE, usuarioSchema, Usuario };
