const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
const EnvironmentCredentials = require("../EnvironmentCredentials.json");

dotenv.config();

// let dialectOptions = {};
// if (process.env.ENVIRONMENT === "production") {
//   dialectOptions = {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false,
//     },
//   };
// }

// const sequelize = new Sequelize(
//   process.env.DATABASE_NAME,
//   process.env.DATABASE_USERNAME,
//   process.env.DATABASE_PASSWORD,
//   {
//     host: process.env.DATABASE_HOST,
//     dialect: process.env.DATABASE_DIALECT,
//     dialectOptions: dialectOptions,
//     logging: process.env.ENVIRONMENT === "production",
//   }
// );

let dialectOptions = {};
if (EnvironmentCredentials.ENVIRONMENT === "production") {
  dialectOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  };
}

const sequelize = new Sequelize(
  EnvironmentCredentials.DATABASE_NAME,
  EnvironmentCredentials.DATABASE_USERNAME,
  EnvironmentCredentials.DATABASE_PASSWORD,
  {
    host: EnvironmentCredentials.DATABASE_HOST,
    dialect: EnvironmentCredentials.DATABASE_DIALECT,
    dialectOptions: dialectOptions,
    logging: EnvironmentCredentials.ENVIRONMENT === "production",
  }
);

module.exports = sequelize;
