const axios = require("axios");
const MunCods = require("../../database/models/Geography/MunCods");

module.exports = async function MeteorologyPlace(results) {
  try {
    const response = await MunCods.findOne({
      where: { NOMBRE: results.place },
    });
    const CODIGOINE = Number(response.dataValues.CODIGOINE.slice(0, 5));
    const COD_PROV = Number(response.dataValues.CODPROV);

    const place = await axios.get(
      `https://www.el-tiempo.net/api/json/v1/provincias/${COD_PROV}/municipios/${CODIGOINE}/weather`
    );
    return {
      elaborado: place.data.elaborado,
      nombre: place.data.nombre,
      origen: place.data.origen,
      prediccion: place.data.prediccion,
      provincia: place.data.provincia,
    };

    // return place.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
