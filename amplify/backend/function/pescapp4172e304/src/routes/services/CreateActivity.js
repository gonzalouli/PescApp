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
    let { name, date, localization, tackle, catches } = data.activity;
    const UserIdCognito = data.UserIdCognito;
    // //Crear activida, para luego insertarle tablas intermedias
    const activitySeq = await Activity.create({
      UserIdCognito,
      name,
    });
    //Localizacion
    localization = await checkLocalization(localization);

    const coordsSeq = await Coords.create({
      lat: localization.coords.lat,
      lng: localization.coords.lng,
    });
    const localizationSeq = await Localization.create({
      ActivityId: activitySeq.Id,
      text: localization.text,
    });
    const localizationCoordsSeq = await LocalizationCoords.create({
      LocalizationId: localizationSeq.Id,
      CoordsId: coordsSeq.Id,
    });
    // ///Capturas
    for (const c of catches) {
      const catchesSeq = await Catches.create({
        Id: c.id || c.Id,
        name: c.name,
        description: c.description,
        imageUrl: c.imageUrl,
      });
      const activityCatchesSeq = await ActivityCatches.create({
        ActivityId: activitySeq.Id,
        CatchId: c.id || c.Id,
      });
    }
    for (const t of tackle) {
      const tackleSeq = await Tackle.create({
        Id: t.id || t.Id,
        name: t.name,
      });
      const activityTackleSeq = await ActivityTackle.create({
        ActivityId: activitySeq.Id,
        TackleId: t.id || t.Id,
      });
    }
    const datesSeq = await Dates.create({
      initDate: date?.initDate,
      endDate: date?.endDate,
      initHour: date?.initHour,
      endHour: date?.endHour,
    });
    await activitySeq.update({
      LocalizationId: localizationSeq.Id,
      DateId: datesSeq.Id,
    });
  } catch (error) {
    console.error(error);
    return false;
  }
};

const checkLocalization = async (localization) => {
  if (localization.coords === undefined) {
    localization.coords = {};
    localization.coords.lat = 0.0;
    localization.coords.lng = 0.0;
  }
  return localization;
};

module.exports = CreateActivity;
