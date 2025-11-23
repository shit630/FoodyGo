const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("DB Connected Successfully");
  } catch (error) {
    console.log(`DB Connect to Failed by ${error.message}`);
  }
};

module.exports = connectDB;
