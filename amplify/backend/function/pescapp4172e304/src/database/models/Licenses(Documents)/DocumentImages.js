const { Model, DataTypes } = require("sequelize");

const sequelize = require("../../sequelize");

class DocumentImages extends Model {}

DocumentImages.init(
  {},
  {
    sequelize,
    modelName: "DocumentImages",
    freezeTableName: true,
    tableName: "DocumentImages",
    timestamps: true,
  }
);

module.exports = DocumentImages;
