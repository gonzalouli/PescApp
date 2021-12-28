const express = require("express");
const activity = express.Router();

const Activity = require("../database/models/Activity");

activity.get("/", async (req, res) => {
  const activities = await Activity.findAll();
  return res.json(activities);
});

module.exports = activity;
