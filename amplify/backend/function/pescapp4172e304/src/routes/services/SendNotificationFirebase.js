const admin = require("firebase-admin");
const firebaseConfig = require("../../../firebase");

admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
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
