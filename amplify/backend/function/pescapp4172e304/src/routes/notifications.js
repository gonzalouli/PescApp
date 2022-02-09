const express = require("express");
const notifications = express.Router();
const InsertNotification = require("./services/InsertNotification");
const GetNotifications = require("./services/GetNotifications");
const DeleteNotifications = require("./services/DeleteNotifications");

notifications.post("/getNotifications", async (req, res) => {
  const result = await GetNotifications(req.body.CongnitoUser);

  if (result == null) {
    res.json({
      error: true,
      message: "Error...",
    });
  } else {
    res.send(result);
  }
});

notifications.post("/setNotifications", async (req, res) => {
  const result = await InsertNotification(req.body);

  if (result === null) {
    res.json({
      error: true,
      message: "Error en el servidor, inténtelo más tarde",
    });
  } else {
    res.json({ success: true, message: "Notificación introducida" });
  }
});

notifications.delete("/deleteNotifications", async (req, res) => {
  const result = await DeleteNotifications(req.body);

  if (result) res.json({ success: true, message: "Notificación borrada" });
  else res.json({ error: true, message: "Error al borrar la actividad" });
});

module.exports = notifications;
