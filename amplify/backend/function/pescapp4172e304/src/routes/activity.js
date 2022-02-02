const express = require("express");
const activity = express.Router();
const CreateActivity = require("./services/CreateActivity");
const GetActivities = require("./services/GetActivities");
const GetActivityWithId = require("./services/GetActivityWithId");
const DeleteActivityWithId = require("./services/DeleteActivityWithId");
const EditActivityWithId = require("./services/EditActivityWithId");

activity.post("/insertActivity", async (req, res) => {
  const result = await CreateActivity(req.body);
  if (result !== false)
    res.json({ success: true, message: "Actividad Introducida" });
  else
    res.json({
      error: true,
      message:
        "Ha habido un error al introducir la actividad, contacte con el administrador...",
    });
});

activity.post("/getAllActivities", async (req, res) => {
  // console.log(req.body);

  const activities = await GetActivities(req.body);

  if (activities === null || activities.length === 0) {
    res.json({
      error: true,
      message: "Usted no tiene aun ninguna actividad",
    });
  } else {
    res.json(activities);
  }
});

activity.post("/getActivityWithId", async (req, res) => {
  // console.log(req.body);

  const result = await GetActivityWithId(req.body);
  if (result === null || result.length === 0) {
    res.json({
      error: true,
      message: "Usted no tiene esta actividad",
    });
  } else {
    res.json(result);
  }
});

activity.delete("/deleteActivityWithId", async (req, res) => {
  // console.log(req.body);

  const result = await DeleteActivityWithId(req.body);
  console.log(result);
  if (result === false) {
    res.json({
      error: true,
      message: "La actividad no se pudo borrar, intentelo mas tarde...",
    });
  } else {
    res.json({ success: true, message: "La actividad ha sido borrada" });
  }
});

activity.patch("/editActivityWithId", async (req, res) => {
  await DeleteActivityWithId(req.body);
  const result = await CreateActivity(req.body);

  if (result === false) {
    res.json({
      error: true,
      message: "La actividad no se pudo editar, intentelo mas tarde...",
    });
  } else {
    res.json({ success: true, message: "La actividad ha sido editada" });
  }
});

module.exports = activity;
