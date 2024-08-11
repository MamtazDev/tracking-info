import mongoose, { Connection } from "mongoose";

let cachedConnection: Connection | null = null;

export async function connectToMongoDB() {
  if (cachedConnection) return cachedConnection;

  try {
    const cnx = await mongoose.connect(
      "mongodb+srv://mamtazfreelancer:f7FcczeDomuZ5F3L@cluster0.6ds5s8q.mongodb.net/tracking"
    );
    cachedConnection = cnx.connection;
    console.log("Database connection established");
    return cachedConnection;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
