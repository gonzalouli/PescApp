const { Model, DataTypes } = require("sequelize");

const sequelize = require("../../sequelize");

class Coords extends Model {}

Coords.init(
  {
    Id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    lat: { type: DataTypes.FLOAT },
    lng: { type: DataTypes.FLOAT },
  },
  {
    sequelize,
    modelName: "Coords",
    freezeTableName: true,
    tableName: "Coords",
    timestamps: true,
  }
);

module.exports = Coords;
