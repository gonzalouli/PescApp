const MunCods = require("../models/Geography/MunCods");
const axios = require("axios");

const ResetCodes = async () => {
  // leemos el archivo usando top-level await y con
  // codificación utf-8

  const json = await axios.get(
    "https://www.el-tiempo.net/api/json/v2/municipios"
  );
  // console.log(json);

  let i = 0;
  json.data.forEach(async (mun) => {
    try {
      // console.log(i++);
      const munSeq = await MunCods.create({
        CODIGOINE: mun.CODIGOINE,
        ID_REL: mun.ID_REL,
        COD_GEO: mun.COD_GEO,
        CODPROV: mun.CODPROV,
        NOMBRE_PROVINCIA: mun.NOMBRE_PROVINCIA,
        NOMBRE: mun.NOMBRE,
        POBLACION_MUNI: mun.POBLACION_MUNI,
        SUPERFICIE: mun.SUPERFICIE,
        PERIMETRO: mun.PERIMETRO,
        CODIGOINE_CAPITAL: mun.CODIGOINE_CAPITAL,
        NOMBRE_CAPITAL: mun.NOMBRE_CAPITAL,
        POBLACION_CAPITAL: mun.POBLACION_CAPITAL,
        HOJA_MTN25: mun.HOJA_MTN25,
        LONGITUD_ETRS89_REGCAN95: mun.LONGITUD_ETRS89_REGCAN95,
        LATITUD_ETRS89_REGCAN95: mun.LATITUD_ETRS89_REGCAN95,
        ORIGEN_COORD: mun.ORIGEN_COORD,
        ALTITUD: mun.ALTITUD,
        ORIGEN_ALTITUD: mun.ORIGEN_ALTITUD,
        DISCREPANTE_INE: mun.DISCREPANTE_INE,
      });
    } catch (error) {
      return;
    }
  });
  console.log("Codigos cargados");
};

module.exports = ResetCodes;
