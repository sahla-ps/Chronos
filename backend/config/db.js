const { config } = require('dotenv')
const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("DB Connected Successfully");
  } catch (error) {
    console.log("DB Connection Error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;