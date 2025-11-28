const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const uploadOnCludinary = async (file) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_APIKEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  try {
    const res = await cloudinary.uploader.upload(file);
    fs.unlinkSync(file);
    return res.secure_url;
  } catch (error) {
    fs.unlinkSync(file);
    console.log(error);
  }
};

module.exports = uploadOnCludinary;
