const axios = require("axios");

module.exports = async function GeocodingFromLatLng(lat, lng) {
  try {
    const place = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.GEOCODING_KEY}`
    );
    return place;
  } catch (error) {
    return null;
  }
};
