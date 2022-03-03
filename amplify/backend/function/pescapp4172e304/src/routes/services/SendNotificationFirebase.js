const admin = require("firebase-admin");
const serviceAcount = require("../../serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAcount),
});

const sendNotification = async (usersToNotificate = []) => {
  let responses = [];

  for (const userToNotificate of usersToNotificate) {
    const { notificationMessage, tokenFirebase } = userToNotificate;

    const message = {
      notification: notificationMessage,
    };

    responses.push(
      await admin.messaging().sendToDevice(tokenFirebase, message, {
        priority: "high",
        timeToLive: 60 * 60 * 24,
      })
    );
  }
};

module.exports = sendNotification;
