const bodyParser = require("body-parser");
const express = require("express");
const register = express.Router();
const Amplify = require("aws-amplify");
const AWS = require("aws-sdk");

const {
  CognitoIdentityServiceProvider,
} = require("./services/CognitoServiceProvider");
const {
  CognitoAdminConfirmSignUp,
} = require("./services/CognitoAdminConfirmSignUp");

///Confirmar un usuario a manita
register.post("/confirm", async (req, res) => {
  const cognitoidentityserviceprovider = await CognitoIdentityServiceProvider();

  const confirmParams = {
    UserPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
    Username: req.body.username,
  };

  const result = await CognitoAdminConfirmSignUp(
    cognitoidentityserviceprovider,
    confirmParams
  );

  if (result === true)
    return res.json({
      error: false,
      msg: "Todo ok",
      data: result,
    });
  else
    return res.json({
      error: true,
      msg: "Error",
      data: result,
    });
});

module.exports = register;
