const Amplify = require("aws-amplify");

const AWS = require("aws-sdk");

const CognitoServiceProvider = async () => {
  const AWS_REGION = process.env.AWS_REGION;
  return new AWS.CognitoIdentityServiceProvider({
    apiVersion: "latest",
    region: AWS_REGION,
  });
};

module.exports = { CognitoServiceProvider };
