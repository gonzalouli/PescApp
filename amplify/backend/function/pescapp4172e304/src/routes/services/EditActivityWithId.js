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

const EditActivityWithId = async (body) => {
  console.log(body);
  try {
    const { CognitoUser, ActivityId, activity } = body;

    const activityEdit = await Activity.findByPk(ActivityId);
  } catch (error) {}
};

module.exports = EditActivityWithId;
