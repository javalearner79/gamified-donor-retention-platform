import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

try {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("✅ Connected successfully!");
} catch (err) {
  console.error(err);
}

process.exit();node testMongo.js