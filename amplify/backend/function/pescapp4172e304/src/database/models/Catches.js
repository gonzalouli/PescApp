const { Model, DataTypes } = require("sequelize");

const sequelize = require("../sequelize");

class Catches extends Model {}

Catches.init(
  {
    id: { type: DataTypes.STRING, primaryKey: true },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
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
