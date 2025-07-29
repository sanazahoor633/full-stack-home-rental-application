import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const MONGO_URI = process.env.MONGO_URI;

const mongoConnection = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI, { dbName: "Dream_Nest" });
    return console.log("connection sucessfull");
  } catch (error) {
    console.log("connection error", error.message);
    throw error;
  }
};

export default mongoConnection;
