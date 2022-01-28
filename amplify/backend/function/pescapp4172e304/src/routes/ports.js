const express = require("express");
const ports = express.Router();
const Ports = require("../database/models/Ports/Ports");
const GetTidefromPort = require("./services/GetTideFromPort");

ports.get("/getPorts", async (req, res) => {
  const allPorts = [];

  try {
    const data = await Ports.findAll();

    data.forEach((e) => {
      allPorts.push({ description: e.description, code: e.code, id: e.id });
    });
    return res.json(allPorts);
  } catch (err) {
    return res.json({ error: true, message: "No se encontraron puertos" });
  }
});

ports.post("/getTide", async (req, res) => {
  const data = await GetTidefromPort(req.body.date, req.body.port);

  if (data == null) {
    return { error: true, message: "Fuera de servicio, pruebe mas tarde..." };
  } else {
    res.json(data);
  }
});

module.exports = ports;
