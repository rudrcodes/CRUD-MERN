import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI;

export const connectToDB = () => {
  mongoose.connect(MONGODB_URI);

  //to check connection status
  mongoose.connection.on("connected", () => {
    console.log("Connected Successfull to the DB ✅");
  });
  mongoose.connection.on("disconnected", () => {
    console.log("Cisconnected Successfull to the DB ✅💔");
  });
  mongoose.connection.on("error", (error) => {
    console.log("Error while connecting to the DB ", error.message);
  });
};
