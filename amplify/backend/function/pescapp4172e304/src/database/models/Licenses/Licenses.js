const { Model, DataTypes } = require("sequelize");

const sequelize = require("../../sequelize");

class Licenses extends Model {}

Licenses.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    UserId: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "Licenses",
    freezeTableName: true,
    tableName: "Licenses",
    timestamps: true,
  }
);

module.exports = Licenses;
