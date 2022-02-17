const axios = require("axios");
const EnvironmentCredentials = require("../../EnvironmentCredentials.json");

module.exports = async function MeteorologyPlace(lat, lng) {
  try {
    const place = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&lang=es&exclude={part}&appid=${EnvironmentCredentials.WEATHER_KEY}&lang=es`
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
