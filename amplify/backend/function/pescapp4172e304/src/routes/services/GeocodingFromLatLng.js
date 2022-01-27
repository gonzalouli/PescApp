const axios = require("axios");

//devuelve la lat y long de un pueblo/ciudad/lugar escrito

module.exports = async function GeocodingFromLatLng(placeName) {
  try {
    const place = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${placeName}&key=${process.env.GEOCODING_KEY}`
    );
    return place.data.results[0].geometry.location;
  } catch (error) {
    return null;
  }
};
