const Amplify = require("aws-amplify");

const AWS = require("aws-sdk");
const EnvironmentCredentials = require("../../EnvironmentCredentials.json");

const CognitoServiceProvider = async () => {
  const AWS_REGION = EnvironmentCredentials.AWS_REGION;
  return new AWS.CognitoIdentityServiceProvider({
    apiVersion: "latest",
    region: AWS_REGION,
  });
};

module.exports = { CognitoServiceProvider };
