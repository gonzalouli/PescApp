const { Model, DataTypes } = require("sequelize");

const sequelize = require("../../sequelize");

class Catches extends Model {}

Catches.init(
  {
    id: { type: DataTypes.STRING, primaryKey: true },
    name: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
    imageUrl: { type: DataTypes.STRING },
  },
  {
    sequelize,
    modelName: "Catches",
    freezeTableName: true,
    tableName: "Catches",
    timestamps: true,
  }
);

module.exports = Catches;
