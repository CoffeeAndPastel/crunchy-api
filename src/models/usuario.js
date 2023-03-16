const { Model, DataTypes } = require("sequelize");

const USUARIO_TABLE = "usarios";

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
    mail: {
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
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    photoUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "photo_Url",
    },
};

class Usuario extends Model {
    static associate(models) {
        this.hasMany(models.Pedido, { foreignKey: "usuario_id" });
        this.hasMany(models.IngredientePorUsuario, {
            foreignKey: "usuario_id",
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
