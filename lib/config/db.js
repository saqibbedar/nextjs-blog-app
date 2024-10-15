import mongoose from "mongoose";

export const connectToDatabase = async (MONGODB_URL) => {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("Connected to the database.");
  } catch (error) {
    console.error("Database connection error: ", error);
  }
};
