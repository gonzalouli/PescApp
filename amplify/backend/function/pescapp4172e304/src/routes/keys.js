const express = require("express");
const keys = express.Router();
const EnvironmentCredentials = require("../../EnvironmentCredentials");

keys.get("/googlemapsallowed", async (req, res) => {
  try {
    res.setHeader(
      "Google-Key",
      EnvironmentCredentials.EnvironmentCredentials.GOOGLE_KEY
    );
  } catch (err) {}
  return res.json({});
});

module.exports = keys;
