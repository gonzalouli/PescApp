const { Notifications } = require("../../database/models/models");

const GetAllNotifications = async () => {
  try {
    const notificationsSeq = await Notifications.findAll();
    return notificationsSeq;
  } catch (error) {
    return null;
  }
};

module.exports = GetAllNotifications;
