const { Model, DataTypes } = require("sequelize");

const sequelize = require("../../sequelize");
const Localization = require("./Localization");
const Dates = require("./Dates");

class Activity extends Model {}

Activity.init(
  {
    Id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    UserIdCognito: {
      type: DataTypes.STRING,
    },
    name: { type: DataTypes.STRING },
  },
  {
    sequelize,
    modelName: "Activity",
    freezeTableName: true,
    tableName: "Activity",
    timestamps: true,
  }
);

Activity.belongsTo(Localization);
Activity.belongsTo(Dates);

module.exports = Activity;
