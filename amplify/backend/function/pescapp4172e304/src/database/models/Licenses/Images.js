const { Model, DataTypes } = require("sequelize");

const sequelize = require("../../sequelize");

class Images extends Model {}

Images.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING },
    description: { type: DataTypes.String },
    imageUrl: { type: DataTypes.STRING },
  },
  {
    sequelize,
    modelName: "Images",
    freezeTableName: true,
    tableName: "Images",
    timestamps: true,
  }
);

module.exports = Images;
