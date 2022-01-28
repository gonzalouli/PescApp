const express = require("express");
const ports = express.Router();
const Ports = require("../database/models/Ports/Ports");

ports.get("/getPorts", async (req, res) => {
  const allPorts = [];

  try {
    const data = await Ports.findAll();

    data.forEach((e) => {
      allPorts.push({ description: e.description, code: e.code });
    });
    return res.json(allPorts);
  } catch (err) {
    return res.json({ error: true, message: "No se encontraron puertos" });
  }
});

module.exports = ports;
