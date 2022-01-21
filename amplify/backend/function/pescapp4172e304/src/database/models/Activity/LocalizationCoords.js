const { Model, DataTypes } = require("sequelize");

const sequelize = require("../../sequelize");

const Coords = require("./Coords");
const Localization = require("./Localization");

class LocalizationCoords extends Model {}

LocalizationCoords.init(
  {},
  {
    sequelize,
    modelName: "LocalizationCoords",
    freezeTableName: true,
    tableName: "LocalizationCoords",
    timestamps: true,
  }
);

LocalizationCoords.belongsTo(Localization);
LocalizationCoords.belongsTo(Coords);

module.exports = LocalizationCoords;
