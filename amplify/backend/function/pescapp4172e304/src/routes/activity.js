const express = require("express");
const { isCatchClause } = require("typescript");
const activity = express.Router();
const CreateActivity = require("./services/CreateActivity");

activity.post("/insertActivity", async (req, res) => {
  try {
    await CreateActivity(req.body);
    res.status(200).json({});
  } catch (error) {
    console.error(error);
  }
});

module.exports = activity;
