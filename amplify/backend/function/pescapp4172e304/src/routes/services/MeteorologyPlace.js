const axios = require("axios");

module.exports = async function MeteorologyPlace(lat, lng) {
  try {
    const place = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude={part}&appid=${process.env.WEATHER_KEY}`
    );
    return {
      place,
    };

    // return place.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
