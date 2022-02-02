const express = require("express");
const licenses = express.Router();
const CreateLicense = require("./services/CreateLicense");
const GetLicense = require("./services/GetLicense");
const DeleteLicense = require("./services/DeleteLicense");

licenses.post("/createLicense", async (req, res) => {
  const result = await CreateLicense(req.body);
  if (result == null) {
    res.json({
      error: true,
      message: "Error en guardar la documentación, inténtelo más tarde",
    });
  } else {
    res.json({ success: true, message: "Documentación guardada" });
  }
});

licenses.post("/getLicense", async (req, res) => {
  const result = await GetLicense(req.body);
  if (result.length === 0) {
    res.json({
      error: true,
      message: "Usted no tiene aún ninguna documentación",
    });
  } else {
    res.send(result);
  }
});

licenses.delete("/deleteLicense", async (req, res) => {
  const result = await DeleteLicense(req.body);
  if (result == null) {
    res.json({
      error: true,
      message: "Error al eliminar la documentación",
    });
  } else {
    res.json({
      success: true,
      message: "Documentación eliminada",
    });
  }
});

module.exports = licenses;
