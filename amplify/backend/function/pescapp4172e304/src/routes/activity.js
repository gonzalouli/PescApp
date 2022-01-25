const express = require("express");
const { isCatchClause } = require("typescript");
const activity = express.Router();
const CreateActivity = require("./services/CreateActivity");

activity.get("/", async (req, res) => {
  // const activities = await Activity.findAll();
  return res.json("hola");
});

activity.post("/insertActivity", async (req, res) => {
  console.log(req.body);
  console.log(req.body.UserCognitoId);
  CreateActivity(req);
  // entidades separadas, juntas en tabla intermedia
  // const catchesSeq = await Catches.create();
  // const activitySeq = await Activity.create()
  // await ActivityCatches.create({ ActivityId: activitySeq.id, CatchesId: catchesSeq.id })

  res.send(req.body);
});

module.exports = activity;
