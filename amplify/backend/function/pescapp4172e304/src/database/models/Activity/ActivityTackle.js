const { Model, DataTypes } = require("sequelize");

const sequelize = require("../../sequelize");
const Activity = require("./Activity");
const Tackle = require("./Tackle");

class ActivityTackle extends Model {}

ActivityTackle.init(
  {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    ActivityId: { type: DataTypes.BIGINT },
    TackleId: { type: DataTypes.STRING },
  },
  {
    sequelize,
    modelName: "ActivityTackle",
    freezeTableName: true,
    tableName: "ActivityTackle",
    timestamps: true,
  }
);

ActivityTackle.belongsTo(Activity);
ActivityTackle.belongsTo(Tackle);

module.exports = ActivityTackle;
