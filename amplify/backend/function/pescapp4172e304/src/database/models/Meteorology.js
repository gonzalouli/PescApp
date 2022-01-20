const { Model, DataTypes } = require("sequelize");

const sequelize = require("../sequelize");

const Coords = require("./Coords");

class Meteorology extends Model {}

Meteorology.init(
  {
    hour: DataTypes.DATE,
    wind: DataTypes.INTEGER,
    marea: DataTypes.INTEGER,
    temp: DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: "Meteorology",
    freezeTableName: true,
    tableName: "Meteorology",
    timestamps: true,
  }
);

module.exports = Meteorology;
