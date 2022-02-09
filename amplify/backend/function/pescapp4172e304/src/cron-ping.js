// * * * * * *
//   | | | | | |
//   | | | | | day of week
//   | | | | month
//   | | | day of month
//   | | hour
//   | minute
//   second ( optional )
const crontab = require("node-crontab");
const GetAllNotifications = require("./routes/services/GetAllNotifications");
const GetTideFromPort = require("./routes/services/GetTideFromPort");
const moment = require("moment");
const RemoveNotificationFromDatabase = require("./routes/services/RemoveNotificationFromDatabase");
const sendNotification = require("./routes/services/SendNotificationFirebase");

const notificationSchedule = crontab.schedule("* * 48 * *", async function () {
  const userToNotificate = [{}];

  const date = moment().add(2, "day").format("YYYY-MM-DD");

  try {
    const notificationBD = await GetAllNotifications();

    if (notificationBD != null) {
      notificationBD.forEach(async (not) => {
        const nextTide = await GetTideFromPort(date, not.port);

        nextTide.mareas.datos.marea.forEach((dato) => {
          if (
            not.alturaMarea - 0.5 < dato.altura &&
            not.alturaMarea + 0.5 > dato.altura &&
            dato.tipo === not.tipoMarea
          ) {
            const notificationMessage = {
              title: `En los proximos dias tendras la meteorologia querida en ${not.portName}`,
              body: `A las ${dato.hora} de tipo ${dato.tipo} y altura ${dato.altura}`,
            };
            userToNotificate.push({
              idUser: not.CognitoUser,
              notificationMessage,
            });
          }
        });

        await RemoveNotificationFromDatabase(not);
      });
      try {
        const res = sendNotification(userToNotificate);
      } catch (error) {}
    }
  } catch (error) {
    console.error(error);
  }
});
