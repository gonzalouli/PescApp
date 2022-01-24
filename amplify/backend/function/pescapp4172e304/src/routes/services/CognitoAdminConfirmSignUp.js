const Amplify = require("aws-amplify");
const CognitoAdminConfirmSignUp = async (
  cognitoidentityserviceprovider,
  confirmParams
) => {
  try {
    await cognitoidentityserviceprovider
      .adminConfirmSignUp(confirmParams)
      .promise();
    return true;
  } catch (error) {
    return null;
  }
};

module.exports = { CognitoAdminConfirmSignUp };
