const { Model, DataTypes } = require("sequelize");

const sequelize = require("../../sequelize");

class Ports extends Model {}

Ports.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
    code: {
      type: DataTypes.STRING,
    },
    description: { type: DataTypes.STRING },
    lat: { type: DataTypes.FLOAT },
    lng: { type: DataTypes.FLOAT },
  },
  {
    sequelize,
    modelName: "Ports",
    freezeTableName: true,
    tableName: "Ports",
  }
);

module.exports = Ports;
