const { Notifications, Ports } = require("../../database/models/models");
const InsertNotification = async (body) => {
  const {
    CognitoUser,
    selectedPort,
    selectedTide,
    selectedHeightTide,
    selectedWind,
  } = body;
  try {
    const port = await Ports.findByPk(selectedPort);

    const notificationSeq = await Notifications.create({
      CognitoUser: CognitoUser.username,
      portName: port.description,
      port: selectedPort,
      tipoMarea: selectedTide,
      alturaMarea: selectedHeightTide,
      viento: selectedWind,
    });

    return true;
  } catch (error) {
    console.error(error);
    return null;
  }
};

module.exports = InsertNotification;
