const express = require("express");
const { isCatchClause } = require("typescript");
const activity = express.Router();
const CreateActivity = require("./services/CreateActivity");

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

module.exports = activity;
