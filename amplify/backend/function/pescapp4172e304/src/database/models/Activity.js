const { Model, DataTypes } = require("sequelize");

const sequelize = require("../sequelize");

class Activity extends Model {}

Activity.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: "Activity",
    freezeTableName: true,
    tableName: "Activity",
    timestamps: true,
  }
);

module.exports = Activity;
