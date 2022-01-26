const express = require("express");
const meteorology = express.Router();
const GeocodingFromLatLng = require("./services/GeocodingFromLatLng");
const MeteorologyPlace = require("./services/MeteorologyPlace");

meteorology.post("/getMeteorology", async (req, res) => {
  if (req.body.name !== undefined) {
    let results = { place: req.body.name };
    const meteorology = await MeteorologyPlace(results);
    if (meteorology != null) {
      res.send(meteorology);
    } else {
      res.json({ error: true, message: "Fuera de servicio" });
    }
  } else {
    const { lat, lng } = req.body.data;
    const data = await GeocodingFromLatLng(lat, lng);

    if (data != null) {
      let place = data.data.plus_code.compound_code.toString();

      place = await tansformToPlace(place);

      const results = {
        place,
        data,
      };

      const meteorology = await MeteorologyPlace(results).then((res) => res);

      if (meteorology !== null) {
        res.send(meteorology);
      } else {
        res.json({ error: true, message: "El lugar no se encuentra" });
      }
    } else {
      res.json({ error: true, message: "Fuera de servicio" });
    }
  }
});

const tansformToPlace = (place) => {
  let init = 0,
    end = 0;
  init = place.indexOf(" ");
  end = place.lastIndexOf(", ");
  place = place.slice(init + 1, end);
  return place;
};

module.exports = meteorology;
