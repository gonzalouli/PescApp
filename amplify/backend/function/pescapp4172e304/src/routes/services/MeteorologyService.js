const axios = require("axios");

const MeteorologyService = async (localization, date) => {
  const data = axios.get(
    "https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/diaria/038"
  );
  return data;
};

module.exports = { MeteorologyService };
