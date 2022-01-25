const { sequelize } = require("../../database/sequelize");
const { MeteorologyService } = require("./MeteorologyService");
const {
  Activity,
  ActivityCatches,
  ActivityMeteorology,
  ActivityTackle,
  Catches,
  Coords,
  Dates,
  Localization,
  LocalizationCoords,
  Meteorology,
  Tackle,
} = require("../../database/models/models");
const { ModuleResolutionKind } = require("typescript");

const CreateActivity = async (data) => {
  const { name, date, localization, tackle, catches, UserIdCognito } = data;
  MeteorologyService();
  // //Crear activida, para luego insertarle tablas intermedias
  // const activitySeq = await Activity.create({
  //   UserIdCognito,
  //   name,
  // });
  // ////Localizacion
  // const coordsSeq = await Coords.create({
  //   lat: localization.coords.lat,
  //   lng: localization.coords.lng,
  // });

  // const localizationSeq = await Localization.create({
  //   text: localization.text,
  // });
  // const localizationCoordsSeq = await LocalizationCoords.create({
  //   LocalizationId: localizationSeq.Id,
  //   CoordsId: coordsSeq.Id,
  // });

  // ///Capturas
  // const activityCatcesSeqArray = [];

  // catches.forEach(async (catche) => {
  //   const catchesSeq = await Catches.create({
  //     id: catche.id,
  //     name: catche.name,
  //     description: catche.description,
  //     imageUrl: catche.imageUrl,
  //   });

  //   const activityCatchesSeq = await ActivityCatches.create({
  //     CatcheId: catchesSeq.id,
  //   });
  //   activityCatcesSeqArray.push(activityCatchesSeq);
  // });

  // const activityTackleSeqArray = [];

  // tackle.forEach(async (tackle) => {
  //   const tackleSeq = await Tackle.create({
  //     Id: tackle.id,
  //     name: tackle.name,
  //   });

  //   const activityTackleSeq = await ActivityTackle.create({
  //     TackleId: tackle.id,
  //   });

  //   activityTackleSeqArray.push(activityTackleSeq);
  // });

  // const datesSeq = await Dates.create({
  //   initDate: date.initDate,
  //   endDate: date.endDate,
  //   initHour: date.initHour,
  //   endHour: date.endHour,
  // });

  // const activityMeteorologySeq = await ActivityMeteorology.create();
};

module.exports = { CreateActivity };
