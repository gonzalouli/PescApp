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

const GetActivityWithId = async (data) => {
  try {
    let activity = {
      catches: [{}],
      date: {},
      localization: {},
      name: "",
      tackle: [],
    };

    const activityWithId = await Activity.findByPk(data.ActivityId);

    activity.name = activityWithId.name;

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
      activity.tackle.push(tackleWithId);
    });

    const activityCatchesWithId = await ActivityCatches.findAll({
      where: {
        ActivityId: activityWithId.Id,
      },
    });

    const arraycatches = [];
    activityCatchesWithId.map(async (item) => {
      const catchWithId = await Catches.findOne({
        where: {
          Id: item.CatchId,
        },
      });
      arraycatches.push(catchWithId.dataValues);
      // activity.catches.push(catchWithId.dataValues);
    });
    activity.catches = arraycatches;

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

    return activity;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const pushActivity = async (activity, catchWithId) => {
  console.log(catchWithId);
  return activity.catches.push(catchWithId.dataValues);
};

module.exports = GetActivityWithId;
