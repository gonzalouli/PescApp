const { Model, DataTypes } = require("sequelize");

const sequelize = require("../../sequelize");

class Tackle extends Model {}

Tackle.init(
  {
    Id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING },
  },
  {
    sequelize,
    modelName: "Tackle",
    freezeTableName: true,
    tableName: "Tackle",
    timestamps: true,
  }
);

module.exports = Tackle;
