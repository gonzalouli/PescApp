// * * * * * *
//   | | | | | |
//   | | | | | day of week
//   | | | | month
//   | | | day of month
//   | | hour
//   | minute
//   second ( optional )
const cron = require("node-cron");
const GetAllNotifications = require("./routes/services/GetAllNotifications");
const GetTideFromPort = require("./routes/services/GetTideFromPort");
const moment = require("moment");
const RemoveNotificationFromDatabase = require("./routes/services/RemoveNotificationFromDatabase");
const sendNotification = require("./routes/services/SendNotificationFirebase");
const { UserTokens } = require("./database/models/models");

/**
 * @param
 * @return
 * @execute Execute the initial cron tab operation for sending all notification of all users
 */
const CronSchedule = async () => {
  cron.schedule("* * 24 * *", async () => {
    const userToNotificate = [];

    const date = moment().add(2, "day").format("YYYY-MM-DD");
    // TODO- DONED: transforms all forEach method of array in for each with object
    // for(const object of objects) {...}

    const notificationBD = await GetAllNotifications();

    if (notificationBD != null) {
      for (const not of notificationBD) {
        const nextTide = await GetTideFromPort(date, not.port);

        for (const dato of nextTide.mareas.datos.marea) {
          if (
            not.alturaMarea - 0.5 < dato.altura &&
            not.alturaMarea + 0.5 > dato.altura &&
            dato.tipo === not.tipoMarea
          ) {
            const userTokens = await UserTokens.findAll({
              where: {
                CognitoUser: not.CognitoUser,
              },
            });
            for (const userToken of userTokens) {
              const notificationMessage = {
                title: `En los proximos dias tendras la meteorologia querida en ${not.portName}`,
                body: `A las ${dato.hora} de tipo ${dato.tipo} y altura ${dato.altura}`,
              };
              userToNotificate.push({
                idUser: not.CognitoUser,
                notificationMessage,
                tokenFirebase: userToken.NotificationToken,
              });
            }
            // }
          }

          await RemoveNotificationFromDatabase(not);
        }
        try {
          const res = await sendNotification(userToNotificate);
        } catch (error) {}
      }
    }
  });
};

module.exports = CronSchedule;
