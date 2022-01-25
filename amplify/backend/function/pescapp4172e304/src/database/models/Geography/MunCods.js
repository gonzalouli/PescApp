const { Model, DataTypes } = require("sequelize");

const sequelize = require("../../sequelize");

class MunCods extends Model {}

MunCods.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    CODIGOINE: { type: DataTypes.STRING },
    ID_REL: { type: DataTypes.STRING },
    COD_GEO: { type: DataTypes.STRING },
    CODPROV: { type: DataTypes.STRING },
    NOMBRE_PROVINCIA: { type: DataTypes.STRING },
    NOMBRE: { type: DataTypes.STRING },
    POBLACION_MUNI: { type: DataTypes.INTEGER },
    SUPERFICIE: { type: DataTypes.DOUBLE },
    PERIMETRO: { type: DataTypes.INTEGER },
    CODIGOINE_CAPITAL: { type: DataTypes.STRING },
    NOMBRE_CAPITAL: { type: DataTypes.STRING },
    POBLACION_CAPITAL: { type: DataTypes.STRING },
    HOJA_MTN25: { type: DataTypes.STRING },
    LONGITUD_ETRS89_REGCAN95: { type: DataTypes.FLOAT },
    LATITUD_ETRS89_REGCAN95: { type: DataTypes.FLOAT },
    ORIGEN_COORD: { type: DataTypes.STRING },
    ALTITUD: { type: DataTypes.INTEGER },
    ORIGEN_ALTITUD: { type: DataTypes.STRING },
    DISCREPANTE_INE: { type: DataTypes.INTEGER },
  },
  {
    sequelize,
    modelName: "MunCods",
    freezeTableName: true,
    tableName: "MunCods",
  }
);

module.exports = MunCods;
