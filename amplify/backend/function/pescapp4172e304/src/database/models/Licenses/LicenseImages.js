const { Model, DataTypes } = require("sequelize");

const sequelize = require("../../sequelize");
const License = require("./Licenses");
const Images = require("./Images");

class LicensesImages extends Model {}

LicensesImages.init(
  {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    LicenseId: { type: DataTypes.BIGINT },
    ImagesId: { type: DataTypes.STRING },
  },
  {
    sequelize,
    modelName: "LicensesImages",
    freezeTableName: true,
    tableName: "LicensesImages",
    timestamps: true,
  }
);

module.exports = LicensesImages;
