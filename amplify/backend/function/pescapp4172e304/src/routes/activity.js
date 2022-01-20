const express = require("express");
const activity = express.Router();

const Activity = require("../database/models/Activity");

activity.get("/", async (req, res) => {
  const activities = await Activity.findAll();
  return res.json(activities);
});

activity.post("/insertActivity", async (req, res) => {
  const [name, date, localization, tackle, catches] = req.body;

  Activity.create();
});

module.exports = activity;
