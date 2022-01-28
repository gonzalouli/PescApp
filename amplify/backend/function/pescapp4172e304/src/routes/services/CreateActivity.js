const { sequelize } = require("../../database/sequelize");
const { MeteorologyService } = require("./MeteorologyService");
const {
  Activity,
  ActivityCatches,
  ActivityTackle,
  Catches,
  Coords,
  Dates,
  Localization,
  LocalizationCoords,
  Tackle,
} = require("../../database/models/models");

const CreateActivity = async (data) => {
  try {
    const { name, date, localization, tackle, catches } = data.activity;
    const UserIdCognito = data.UserIdCognito;
    // //Crear activida, para luego insertarle tablas intermedias
    console.log(Activity);
    const activitySeq = await Activity.create({
      UserIdCognito,
      name,
    });
    ////Localizacion
    // const coordsSeq = await Coords.create({
    //   lat: localization.coords.lat,
    //   lng: localization.coords.lng,
    // });
    // const localizationSeq = await Localization.create({
    //   ActivityId: activitySeq.Id,
    //   text: localization.text,
    // });
    // const localizationCoordsSeq = await LocalizationCoords.create({
    //   LocalizationId: localizationSeq.Id,
    //   CoordsId: coordsSeq.Id,
    // });
    // // ///Capturas
    // const activityCatcesSeqArray = [];
    // catches.forEach(async (catche) => {
    //   const catchesSeq = await Catches.create({
    //     id: catche.id,
    //     name: catche.name,
    //     description: catche.description,
    //     imageUrl: catche.imageUrl,
    //   });
    //   const activityCatchesSeq = await ActivityCatches.create({
    //     ActivityId: activitySeq.Id,
    //     CatchId: catchesSeq.id,
    //   });
    //   activityCatcesSeqArray.push(activityCatchesSeq);
    // });
    // const activityTackleSeqArray = [];
    // for (const t of tackle) {
    //   const tackleSeq = await Tackle.create({
    //     Id: t.id,
    //     name: t.name,
    //   });
    //   const activityTackleSeq = await ActivityTackle.create({
    //     ActivityId: activitySeq.Id,
    //     TackleId: t.id,
    //   });
    //   activityTackleSeqArray.push(activityTackleSeq);
    // }
    // const datesSeq = await Dates.create({
    //   initDate: date.initDate,
    //   endDate: date.endDate,
    //   initHour: date.initHour,
    //   endHour: date.endHour,
    // });
    // await activitySeq.update({
    //   LocalizationId: localizationSeq.Id,
    //   DateId: datesSeq.Id,
    // });
  } catch (error) {
    console.error(error);
  }
};

module.exports = CreateActivity;
