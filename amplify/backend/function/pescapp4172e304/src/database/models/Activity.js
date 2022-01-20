const { Model, DataTypes } = require("sequelize");

const sequelize = require("../sequelize");
const Localization = require("./Localization");
const Dates = require("./Dates");
const Tackle = require("./Tackle");
const Catches = require("./Catches");
const Meteorology = require("./Meteorology");

class Activity extends Model {}

Activity.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    UserId: {
      type: DataTypes.STRING,
    },
    name: DataTypes.STRING,
    localization: Localization,
    tackle: DataTypes.ARRAY(Tackle),
    catches: DataTypes.ARRAY(Catches),
    meteorology: DataTypes.ARRAY(Meteorology),
    date: Dates,
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
