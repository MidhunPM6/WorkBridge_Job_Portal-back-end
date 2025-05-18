// src/config/db.js
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); 

const mongoUsername = process.env.MONGO_USERNAME;
const mongoPassword = encodeURIComponent(process.env.MONGO_PASSWORD); 

const connectDB = async () => {
  try {
    const uri = `mongodb+srv://${mongoUsername}:${mongoPassword}@cluster0.p2cn2fu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
    await mongoose.connect(uri, {
      dbName: "workBridge",
    });
    console.log(" MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1); 
  }
};

export default connectDB();
