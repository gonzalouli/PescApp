const { Model, DataTypes } = require("sequelize");

const sequelize = require("../sequelize");
const Activity = require("./Activity");
const Catches = require("./Catches");

class ActivityCatches extends Model {}

ActivityCatches.init(
  {},
  {
    sequelize,
    modelName: "ActivityCatches",
    freezeTableName: true,
    tableName: "ActivityCatches",
    timestamps: true,
  }
);

ActivityCatches.belongTo(Activity);
ActivityCatches.belongTo(Catches);

module.exports = ActivityCatches;
