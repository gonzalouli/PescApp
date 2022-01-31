const express = require("express");
const { isCatchClause } = require("typescript");
const activity = express.Router();
const CreateActivity = require("./services/CreateActivity");
const GetActivities = require("./services/GetActivities");
const GetActivityWithId = require("./services/GetActivityWithId");

activity.post("/insertActivity", async (req, res) => {
  const result = await CreateActivity(req.body);
  if (result != false)
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

  if (activities == null || activities.length == 0) {
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

  const activities = await GetActivityWithId(req.body);

  if (activities == null || activities.length == 0) {
    res.json({
      error: true,
      message: "Usted no tiene esta actividad",
    });
  } else {
    res.json(activities);
  }
});

module.exports = activity;
