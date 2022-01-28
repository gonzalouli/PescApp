const { Model, DataTypes } = require("sequelize");

const sequelize = require("../../sequelize");

class Dates extends Model {}

Dates.init(
  {
    Id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    initDate: { type: DataTypes.STRING },
    endDate: { type: DataTypes.STRING },
    initHour: { type: DataTypes.STRING },
    endHour: { type: DataTypes.STRING },
  },
  {
    sequelize,
    modelName: "Dates",
    freezeTableName: true,
    tableName: "Dates",
    timestamps: true,
  }
);

module.exports = Dates;
