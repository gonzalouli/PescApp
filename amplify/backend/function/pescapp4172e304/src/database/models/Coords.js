const { Model, DataTypes } = require("sequelize");

const sequelize = require("../sequelize");

class Coords extends Model {}

Coords.init(
  {
    ActivityId: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT,
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
