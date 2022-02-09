const { Model, DataTypes } = require("sequelize");

const sequelize = require("../../sequelize");

class Notifications extends Model {}

Notifications.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    CognitoUser: { type: DataTypes.STRING },
    port: { type: DataTypes.STRING },
    portName: { type: DataTypes.STRING },
    tipoMarea: { type: DataTypes.STRING },
    alturaMarea: { type: DataTypes.FLOAT },
    viento: { type: DataTypes.FLOAT },
  },
  {
    sequelize,
    modelName: "Notifications",
    freezeTableName: true,
    tableName: "Notifications",
  }
);

module.exports = Notifications;
