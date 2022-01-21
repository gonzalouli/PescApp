const { Model, DataTypes } = require("sequelize");

const sequelize = require("../../sequelize");

class Dates extends Model {}

Dates.init(
  {
    DatesId: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    initDate: { type: DataTypes.DATE },
    endDate: { type: DataTypes.DATE },
    initHour: { type: DataTypes.DATE },
    endHour: { type: DataTypes.DATE },
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
