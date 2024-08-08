import mongoose, { Connection } from "mongoose";

let cachedConnection: Connection | null = null;

export async function connectToMongoDB() {
  if (cachedConnection) return cachedConnection;

  try {
    const cnx = await mongoose.connect("mongodb://0.0.0.0:27017/tracking");
    cachedConnection = cnx.connection;
    console.log("Database connection established");
    return cachedConnection;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
