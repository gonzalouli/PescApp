const { Notifications } = require("../../database/models/models");

const DeleteNotifications = async (data) => {
  try {
    const { CognitoUser, notification } = data;

    const res = await Notifications.findOne({
      where: {
        CognitoUser: CognitoUser,
        port: notification.port,
        tipoMarea: notification.tipoMarea,
        alturaMarea: notification.alturaMarea,
        viento: notification.viento,
      },
    });

    res.destroy();

    return true;
  } catch (error) {
    console.error(error);
    return null;
  }
};

module.exports = DeleteNotifications;
