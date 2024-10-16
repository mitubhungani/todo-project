const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  await mongoose.connect(process.env.DB_URL);
  console.log("connect successfully");
};

module.exports = connectDB;
