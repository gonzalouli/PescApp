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

const ExtractActivity = async (activity, data) => {
  try {
    const activityWithId = await Activity.findByPk(data.ActivityId);

    activity.name = activityWithId.name;

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

    activity.localization.text = localizationWithId.text;
    activity.localization.coords = {};
    activity.localization.coords.lat = coordsWithId.lat;
    activity.localization.coords.lng = coordsWithId.lng;

    const dateWithId = await Dates.findOne({
      where: { id: activityWithId.DateId },
    });

    activity.date.endDate = dateWithId.endDate;
    activity.date.initDate = dateWithId.initDate;
    activity.date.endHour = dateWithId.endHour;
    activity.date.initHour = dateWithId.initHour;

    const activityTackleWithId = await ActivityTackle.findAll({
      where: {
        ActivityId: activityWithId.Id,
      },
    });
    activityTackleWithId.forEach(async (element) => {
      const tackleWithId = await Tackle.findOne({
        where: { Id: element.TackleId },
      });
      activity.tackle.push(tackleWithId.name);
    });

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

      activity.catches.push(catchWithId.dataValues);
    });

    return activity;
  } catch (error) {
    console.error(error);
    return null;
  }
};

module.exports = ExtractActivity;
