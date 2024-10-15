import UserData from "../models/userModel";

const base64Converter = function (userData: UserData) {
  const imageSrc = `data:${userData.pfp.img.type || "image/svg+xml"};base64,${
    userData.pfp.img.data
  }`;
  return imageSrc;
};

export default base64Converter;
