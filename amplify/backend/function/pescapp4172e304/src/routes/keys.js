const express = require("express");
const keys = express.Router();

keys.get("/googlemapsallowed", async (req, res) => {
  res.setHeader("Google-Key", process.env.GOOGLE_KEY);
  return res.json({});
});

module.exports = keys;
