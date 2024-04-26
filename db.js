const mongoose = require("mongoose");
require("dotenv").config();

 const  DB_URL  =  "mongodb+srv://user1:admin123@cluster0.dv2fh9k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
//const DB_URL = process.env.MONGODB_URI;

module.exports = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("DB CONNECTION successful");
  } catch (error) {
    console.error("Error occurred during DB connection:");
    console.error(error);
  }
};
