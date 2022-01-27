const express = require("express");
const meteorology = express.Router();
const GeocodingFromLatLng = require("./services/GeocodingFromLatLng");
const MeteorologyPlace = require("./services/MeteorologyPlace");

meteorology.post("/getMeteorology", async (req, res) => {
  // const data = await GeocodingFromLatLng("PuertoReal");
  if (req.body.name !== undefined) {
    const coords = await GeocodingFromLatLng(req.body.name);

    const meteorology = await MeteorologyPlace(coords.lat, coords.lng);
    // console.log(meteorology.place.data);
    if (meteorology != null) {
      res.json(meteorology.place.data);
    } else {
      res.json({ error: true, message: "Localizacion no encontrada" });
    }
  } else {
    const meteorology = await MeteorologyPlace(
      req.body.data.lat,
      req.body.data.lng
    );

    if (meteorology !== null) {
      res.json(meteorology.place.data);
    } else {
      res.json({ error: true, message: "Localizacion no encontrada" });
    }
  }
});

module.exports = meteorology;
