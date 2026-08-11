import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    console.log("URI:", process.env.MONGODB_URI);

    const connection = await mongoose.connect(process.env.MONGODB_URI);

    console.log("✅ MongoDB Connected:", connection.connection.host);
  } catch (error) {
    console.error(error);
  }
};

export default connectDatabase;
