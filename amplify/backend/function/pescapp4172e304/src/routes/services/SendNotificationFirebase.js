const admin = require("firebase-admin");
const firebaseConfig = require("../../../firebase");

admin.initializeApp({
  credential: admin.credential.cert({
    apiKey: "AIzaSyCCK6hK8vnTL1VqBIPSZTptr1NYq4_aceE",
    authDomain: "pesc-app-8f7f1.firebaseapp.com",
    projectId: "pesc-app-8f7f1",
    storageBucket: "pesc-app-8f7f1.appspot.com",
    messagingSenderId: "937853490512",
    appId: "1:937853490512:web:bd0f909edc03c51c3e4855",
  }),
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
