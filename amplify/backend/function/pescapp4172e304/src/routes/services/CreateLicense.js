const Licenses = require("../../database/models/Licenses/Licenses");
const LicenseImages = require("../../database/models/Licenses/LicenseImages");
const Images = require("../../database/models/Licenses/Images");

const CreateLicense = async (data) => {
  try {
    const { CognitoUser, License } = data;

    for (const l of License) {
      const { id, name, description, imageUrl } = l;
      const licenseSeq = await Licenses.create({
        UserId: CognitoUser,
      });

      const licenseImageSeq = await LicenseImages.create({
        LicenseId: licenseSeq.id,
        ImagesId: l.id,
      });
      const imagesSeq = await Images.create({
        id: id,
        name: name,
        description: description,
        imageUrl: imageUrl,
      });
    }

    return true;
  } catch (error) {
    console.error(error);
    return null;
  }
};

module.exports = CreateLicense;
