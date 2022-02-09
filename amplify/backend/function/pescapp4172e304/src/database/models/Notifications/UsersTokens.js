const { Model, DataTypes } = require("sequelize");

const sequelize = require("../../sequelize");

class UsersTokens extends Model {}

UsersTokens.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    CognitoUser: { type: DataTypes.STRING },
    NotificationToken: { type: DataTypes.TEXT, unique: true },
  },
  {
    sequelize,
    modelName: "UsersTokens",
    freezeTableName: true,
    tableName: "UsersTokens",
  }
);

module.exports = UsersTokens;
