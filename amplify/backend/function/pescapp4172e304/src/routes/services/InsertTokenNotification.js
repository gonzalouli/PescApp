const { UserTokens } = require("../../database/models/models");

const InsertTokenNotification = async (data) => {
  const { CognitoUser, NotificationToken } = data;
  try {
    const result = await UserTokens.create({
      CognitoUser,
      NotificationToken,
    });
    return result;
  } catch (error) {
    return null;
  }
};

module.exports = InsertTokenNotification;
