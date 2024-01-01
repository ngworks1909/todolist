
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectToMongo = async () => {
  const database = await mongoose.connect(process.env.CONNECT);
  console.log("Connected to database");
};

module.exports = connectToMongo;
