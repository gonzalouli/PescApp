const { Model, DataTypes } = require("sequelize");

const sequelize = require("../../sequelize");

const Coords = require("./Coords");

class Localization extends Model {}

Localization.init(
  {
    LocalizationId: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },

    text: { type: DataTypes.STRING },
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
