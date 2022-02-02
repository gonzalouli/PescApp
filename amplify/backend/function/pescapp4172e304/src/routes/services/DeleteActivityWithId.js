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

const DeleteActivityWithId = async (data) => {
  try {
    const activityWithId = await Activity.findByPk(data.ActivityId);

    //#############Borrado de coords, localizacioncoords, y localizacion\
    if (activityWithId.LocalizationId !== null) {
      const localizationWithId = await Localization.findOne({
        where: { activityId: activityWithId.LocalizationId },
      });
      const localizationCoordsWithId = await LocalizationCoords.findOne({
        where: { LocalizationId: localizationWithId.Id },
      });

      const coordsWithId = await Coords.findOne({
        where: {
          Id: localizationCoordsWithId.CoordsId,
        },
      });
      await coordsWithId.destroy();
      await localizationCoordsWithId.destroy();
      await localizationWithId.destroy();
    }

    //#############Borrado de fecha
    if (activityWithId.DateId != null) {
      const dateWithId = await Dates.findOne({
        where: { id: activityWithId.DateId },
      });

      await dateWithId.destroy();
    }
    //#############Borrado de equipo

    const activityTackleWithId = await ActivityTackle.findAll({
      where: {
        ActivityId: activityWithId.Id,
      },
    });

    activityTackleWithId.forEach(async (element) => {
      const tackleWithId = await Tackle.findOne({
        where: { Id: element.TackleId },
      });
      await tackleWithId.destroy();
    });

    await ActivityTackle.destroy({ where: { ActivityId: activityWithId.Id } });

    //#############Borrado de capturas
    const activityCatchesWithId = await ActivityCatches.findAll({
      where: {
        ActivityId: activityWithId.Id,
      },
    });

    activityCatchesWithId.forEach(async (item) => {
      const catchWithId = await Catches.findOne({
        where: {
          Id: item.CatchId,
        },
      });
      await catchWithId.destroy({ force: true });
    });

    await ActivityCatches.destroy({ where: { ActivityId: activityWithId.Id } });

    //#############Borrado de actividad
    await activityWithId.destroy();

    return true;
  } catch (error) {
    return false;
  }
};

module.exports = DeleteActivityWithId;
