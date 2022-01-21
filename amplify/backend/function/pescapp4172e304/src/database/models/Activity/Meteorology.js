const { Model, DataTypes } = require("sequelize");

const sequelize = require("../../sequelize");

const Coords = require("./Coords");

class Meteorology extends Model {}

Meteorology.init(
  {
    MeteorologyId: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    hour: { type: DataTypes.DATE },
    wind: { tye: DataTypes.INTEGER },
    marea: { type: DataTypes.INTEGER },
    temp: { type: DataTypes.INTEGER },
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
