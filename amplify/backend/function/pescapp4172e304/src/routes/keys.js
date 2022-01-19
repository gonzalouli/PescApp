const express = require("express");
const keys = express.Router();

keys.get("/googlemapsallowed", async (req, res) => {
  try {
    res.setHeader("Google-Key", process.env.GOOGLE_KEY);
  } catch (err) {}
  return res.json({});
});

module.exports = keys;
