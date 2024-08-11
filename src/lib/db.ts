import mongoose, { Connection } from "mongoose";

let cachedConnection: Connection | null = null;

export async function connectToMongoDB() {
  if (cachedConnection) return cachedConnection;

  try {
    const cnx = await mongoose.connect(`${process.env.NEXT_PUBLIC_MONGO_URL}`);
    cachedConnection = cnx.connection;
    console.log("Database connection established");
    return cachedConnection;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
