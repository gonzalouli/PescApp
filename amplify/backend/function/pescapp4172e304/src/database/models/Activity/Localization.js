const { Model, DataTypes } = require("sequelize");

const sequelize = require("../../sequelize");

class Localization extends Model {}

Localization.init(
  {
    Id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    ActivityId: { type: DataTypes.BIGINT },

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
