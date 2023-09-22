const mongoose = require("mongoose");
const mongoURI = "mongodb://127.0.0.1:27017/my-notebook";

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to database");
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
};

module.exports = connectToMongo;
