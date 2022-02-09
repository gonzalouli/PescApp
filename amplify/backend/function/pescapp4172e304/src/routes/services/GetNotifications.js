const { Notifications } = require("../../database/models/models");

const GetNotifications = async (CognitoUser) => {
  try {
    let res = await Notifications.findAll({
      where: {
        CognitoUser: CognitoUser,
      },
    });

    res.forEach((e) => {
      delete e.dataValues.CognitoUser;
    });

    return res;
  } catch (error) {
    console.error(error);
    return null;
  }
};

module.exports = GetNotifications;
