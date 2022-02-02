const Licenses = require("../../database/models/Licenses/Licenses");
const LicenseImages = require("../../database/models/Licenses/LicenseImages");
const Images = require("../../database/models/Licenses/Images");

const DeleteLicense = async (body) => {
  try {
    const { CognitoUser, id } = body;
    const imagesSeq = await Images.findOne({ where: { id: id } });
    const licenseImagesSeq = await LicenseImages.findOne({
      where: { ImagesId: id },
    });
    const licenseSeq = await Licenses.findOne({
      where: { id: licenseImagesSeq.id, UserId: CognitoUser },
    });

    imagesSeq.destroy();
    licenseImagesSeq.destroy();
    licenseSeq.destroy();
    return true;
  } catch (error) {
    return null;
  }
};

module.exports = DeleteLicense;
