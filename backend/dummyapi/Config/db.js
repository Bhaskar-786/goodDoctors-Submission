const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/person", {});
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Connection failed", error);
  }
};

module.exports = connectDB;
