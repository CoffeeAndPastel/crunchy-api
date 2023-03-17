const { Model, DataTypes } = require("sequelize");
const { PLATILLO_TABLE } = require("./platillo");

const LOCAL_TABLE = "locales";

const localSchema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    photoUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "photo_Url",
    },
};

class Local extends Model {
    static associate(models) {
        this.hasMany(models.Platillo, { as: "platillos", foreignKey: "localId" });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: LOCAL_TABLE,
            modelName: "Local",
        };
    }
}

module.exports = { LOCAL_TABLE, localSchema, Local };
