import mongoose from "mongoose";

const connectMongoDB = async () => {
  const connectionString = process.env.NEXT_PUBLIC_MONGODB_URI;

  if (!connectionString) {
    return;
  }

  try {
    await mongoose.connect(connectionString);
    console.log("Connected to MongoDB instance");
  } catch (error) {
    console.log(error);
  }
};

export default connectMongoDB;
