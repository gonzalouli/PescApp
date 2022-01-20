const { Model, DataTypes } = require("sequelize");

const sequelize = require("../sequelize");

class Dates extends Model {}

Dates.init(
  {
    initDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    initHour: DataTypes.DATE,
    endHour: DataTypes.DATE,
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
