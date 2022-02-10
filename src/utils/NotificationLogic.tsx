import { Capacitor } from "@capacitor/core";
import {
  PushNotificationSchema,
  PushNotifications,
  Token,
  ActionPerformed,
} from "@capacitor/push-notifications";
import { LocalNotifications } from "@capacitor/local-notifications";
import { nanoid, customAlphabet } from "nanoid";

export const notificationPush = async () => {
  if (!Capacitor.isNativePlatform()) return;
  const nanoid = customAlphabet("1234567890", 18);

  PushNotifications.addListener("registration", (token: Token) => {
    try {
      localStorage.setItem("pushToken", token.value);
    } catch (error) {
      alert("Error al guardar el token de notificacion");
    }
  });

  PushNotifications.addListener(
    "pushNotificationReceived",
    async (notification: PushNotificationSchema) => {
      try {
        await LocalNotifications.schedule({
          notifications: [
            {
              title: `${notification.title}`,
              body: `${notification.body}`,
              id: Number(nanoid()),
            },
          ],
        });
      } catch (error) {
        alert(error);
      }
    }
  );

  PushNotifications.addListener(
    "pushNotificationActionPerformed",
    (notification: ActionPerformed) => {}
  );

  LocalNotifications.addListener(
    "localNotificationActionPerformed",
    (notificationAction) => {}
  );

  const result = await PushNotifications.requestPermissions();
  // Register with Apple / Google to receive push via APNS/FCM
  if (result.receive === "granted") PushNotifications.register();
};
