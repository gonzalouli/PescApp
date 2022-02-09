const { Notifications } = require("../../database/models/models");

const DeleteNotifications = async (data) => {
  try {
    const res = await Notifications.findOne({
      where: {
        CognitoUser: data.CognitoUser,
        port: data.port,
        tipoMarea: data.tipoMarea,
        alturaMarea: data.alturaMarea,
        viento: data.viento,
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
