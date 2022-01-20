const { Model, DataTypes } = require("sequelize");

const sequelize = require("../sequelize");

class Tackle extends Model {}

Tackle.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: DataTypes.STRING,
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
