/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/
if (process.env.ENVIRONMENT === "develop") console.warn = () => {};

const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
const dotenv = require("dotenv");
dotenv.config();

// declare a new express app
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "x-www-form-urlencoded, Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

//agrega router
app.use(
  cors({
    // credentials: true,
    // origin: true,
    exposedHeaders: ["Google-Key"],
  })
);
app.options("*", cors());

app.use(
  express.json({
    limit: "1024mb",
  })
);
app.use(
  express.urlencoded({
    extended: false,
    limit: "1024mb",
  })
);

const keys = require("./routes/keys");
const activities = require("./routes/activity");
const register = require("./routes/register");
const meteorology = require("./routes/meteorology");

app.use("/keys", keys);
app.use("/activities", activities);
app.use("/register", register);
app.use("/meteorology", meteorology);

const sequelize = require("./database/sequelize");
// const { CodeStarNotifications } = require("aws-sdk");
require("./database/models/models");
(async () => {
  await sequelize
    .sync()
    .then(() => {
      console.log("DB sincronizada");
    })
    .catch((e) => {
      console.error(e);
    });
})();

const ResetCodes = require("./database/services/ResetCodes");
ResetCodes();

app.listen(4444, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
