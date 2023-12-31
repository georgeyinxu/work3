import mongoose from "mongoose";

const connectMongoDB = async () => {
  const connectionString = process.env.MONGODB_URI;

  if (!connectionString) {
    return;
  }

  try {
    await mongoose.connect(connectionString);
  } catch (error) {
    console.log(error);
  }
};

export default connectMongoDB;
