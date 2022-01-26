const express = require("express");
const meteorology = express.Router();
const GeocodingFromLatLng = require("./services/GeocodingFromLatLng");
const Meteorology = require("./services/MeteorologyPlace");

meteorology.post("/getMeteorology", async (req, res) => {
  console.log(req.body.data);
  const { lat, lng } = req.body.data;
  try {
    const data = await GeocodingFromLatLng(lat, lng);

    console.log(data);
    if (data != null) {
      let place = data.data.plus_code.compound_code.toString();

      let init = 0,
        end = 0;
      init = place.indexOf(" ");
      end = place.lastIndexOf(", ");
      place = place.slice(init + 1, end);
    } else {
      return { status: { error: true, message: "Fuera de servicio" } };
    }
  } catch (error) {
    console.error(error);
  }
});

module.exports = meteorology;
