const { Model, DataTypes } = require("sequelize");

const sequelize = require("../sequelize");

const Coords = require("./Coords");

class Localization extends Model {}

Localization.init(
  {
    coords: Coords,
    text: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "Localization",
    freezeTableName: true,
    tableName: "Localization",
    timestamps: true,
  }
);

module.exports = Localization;
