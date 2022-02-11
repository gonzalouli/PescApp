const dotenv = require("dotenv");
dotenv.config();
const sequelize = require("./sequelize");
require("./models/models");

(async () => {
  await sequelize.sync({ force: true });
  const ResetCodes = require("./services/ResetCodes");
  await ResetCodes();
})();
