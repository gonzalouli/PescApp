const { Model, DataTypes } = require("sequelize");

const sequelize = require("../../sequelize");
const Activity = require("./Activity");
const Catches = require("./Catches");

class ActivityCatches extends Model {}

ActivityCatches.init(
  {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    ActivityId: { type: DataTypes.BIGINT },
    CatchId: { type: DataTypes.STRING },
  },
  {
    sequelize,
    modelName: "ActivityCatches",
    freezeTableName: true,
    tableName: "ActivityCatches",
    timestamps: true,
  }
);

ActivityCatches.belongsTo(Activity);
ActivityCatches.belongsTo(Catches);

module.exports = ActivityCatches;
