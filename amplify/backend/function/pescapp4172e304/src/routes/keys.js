const express = require("express");
const keys = express.Router();
const EnvironmentCredentials = require("../EnvironmentCredentials.json");

keys.get("/googlemapsallowed", async (req, res) => {
  try {
    res.setHeader("Google-Key", EnvironmentCredentials.GOOGLE_KEY);
  } catch (err) {}
  return res.json({});
});

module.exports = keys;
