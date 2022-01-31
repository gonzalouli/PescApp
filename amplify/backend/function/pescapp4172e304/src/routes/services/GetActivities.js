const { Activity } = require("../../database/models/models");

const GetActivities = async (body) => {
  try {
    const results = await Activity.findAll({
      where: { UserIdCognito: body.CognitoUser.username },
    });

    if (results.length > 0) {
      results.forEach((r) => {
        delete r.dataValues.UserIdCognito;
      });
    }

    return results;
  } catch (error) {
    return null;
  }
};

module.exports = GetActivities;
