const { Model, DataTypes } = require("sequelize");

const sequelize = require("../sequelize");

class Document extends Model {}

Document.init(
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
    description: DataTypes.String,
    images: DataTypes.ARRAY(DataTypes.STRING),
  },
  {
    sequelize,
    modelName: "Document",
    freezeTableName: true,
    tableName: "Document",
    timestamps: true,
  }
);

module.exports = Document;
