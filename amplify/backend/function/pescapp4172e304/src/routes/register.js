const bodyParser = require("body-parser");
const express = require("express");
const register = express.Router();
const Amplify = require("aws-amplify");

const AWS = require("aws-sdk");

register.post("/confirm", async (req, res) => {
  const AWS_REGION = "eu-west-1";
  const AWS_COGNITO_USER_POOL_ID = "eu-west-1_lIa28Qaxw";

  const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider(
    {
      apiVersion: "latest",
      region: AWS_REGION,
    }
  );

  const confirmParams = {
    UserPoolId: AWS_COGNITO_USER_POOL_ID,
    Username: req.body.username,
  };

  try {
    const result = await cognitoidentityserviceprovider
      .adminConfirmSignUp(confirmParams)
      .promise();

    return res.json({
      error: false,
      msg: "Todo ok",
      data: result,
    });
  } catch (err) {
    return res.json({
      error: true,
      msg: "Error",
      data: {},
    });
  }
});

module.exports = register;
