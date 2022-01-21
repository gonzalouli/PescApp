const { Model, DataTypes } = require("sequelize");

const sequelize = require("../../sequelize");

const Coords = require("./Coords");
const Localization = require("./Localization");

class LocalizationCoords extends Model {}

LocalizationCoords.init(
  {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    LocalizationId: { type: DataTypes.BIGINT },
    CoordsId: { type: DataTypes.STRING },
  },
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
