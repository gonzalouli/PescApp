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
    UserId: {
      type: DataTypes.STRING,
    },
    name: DataTypes.STRING,
    localization: {
      coords: {
        lat: DataTypes.FLOAT,
        lng: DataTypes.FLOAT,
      },
      text: DataTypes.STRING,
    },
    tackle: DataTypes.ARRAY({
      id: DataTypes.STRING,
      name: DataTypes.STRING,
    }),
    catches: DataTypes.ARRAY({
      id: DataTypes.STRING,
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
    }),
    meteorology: DataTypes.ARRAY({
      hour: DataTypes.DATE,
      wind: DataTypes.INTEGER,
      marea: DataTypes.INTEGER,
      temp: DataTypes.INTEGER,
    }),
    date: {
      initDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      initHour: DataTypes.DATE,
      endHour: DataTypes.DATE,
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
