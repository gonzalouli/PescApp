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
  console.log(data);
  try {
    // const activityWithID = await Activity.findByPk()
  } catch (error) {}
};

module.exports = GetActivityWithId;
