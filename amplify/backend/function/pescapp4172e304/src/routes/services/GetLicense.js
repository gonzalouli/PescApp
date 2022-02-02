const Licenses = require("../../database/models/Licenses/Licenses");
const LicenseImages = require("../../database/models/Licenses/LicenseImages");
const Images = require("../../database/models/Licenses/Images");
const { Auth } = require("aws-amplify");

const GetLicense = async (data) => {
  try {
    const licenses = [];
    const licenseSeq = await Licenses.findAll({
      where: { UserId: data.CognitoUser },
    });

    for (const l of licenseSeq) {
      const licenseImageSeq = await LicenseImages.findOne({
        where: { LicenseId: l.id },
      });

      const imagesSeq = await Images.findOne({
        where: { id: licenseImageSeq.ImagesId },
      });
      licenses.push(imagesSeq.dataValues);
    }
    return licenses;
  } catch (error) {
    console.error(error);
    return null;
  }
};

module.exports = GetLicense;
