const express = require("express");
const { isCatchClause } = require("typescript");
const activity = express.Router();

const Activity = require("../database/models/Activity/Activity");

activity.get("/", async (req, res) => {
  const activities = await Activity.findAll();
  return res.json("hola");
});

activity.post("/insertActivity", async (req, res) => {
  const { name, date, localization, tackle, catches } = req.body;
  console.log(req.body);
  //entidades separadas, juntas en tabla intermedia
  // const catchesSeq = await Catches.create();
  // const activitySeq = await Activity.create()
  // await ActivityCatches.create({ ActivityId: activitySeq.id, CatchesId: catchesSeq.id })
});

module.exports = activity;
