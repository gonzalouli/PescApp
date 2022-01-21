const { Model, DataTypes } = require("sequelize");

const sequelize = require("../../sequelize");
const Activity = require("./Activity/Activity");
const Meteorology = require("./Meteorology");

class ActivityMeteorology extends Model {}

ActivityMeteorology.init(
  {},
  {
    sequelize,
    modelName: "ActivityMeteorology",
    freezeTableName: true,
    tableName: "ActivityMeteorology",
    timestamps: true,
  }
);

ActivityMeteorology.belongsTo(Activity);
ActivityMeteorology.belongsTo(Meteorology);

module.exports = ActivityMeteorology;
