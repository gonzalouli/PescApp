const { Model, DataTypes } = require("sequelize");

const sequelize = require("../../sequelize");
const Activity = require("./Activity");
const Meteorology = require("./Meteorology");

class ActivityMeteorology extends Model {}

ActivityMeteorology.init(
  {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    ActivityId: { type: DataTypes.BIGINT },
    MeteorologyId: { type: DataTypes.BIGINT },
  },
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
