import mongoose from "mongoose";

/**
 * @function connectDB
 * @description Connects to the MongoDB database using the URI from environment variables.
 * @throws Will log an error if the connection fails and exit the process.
 * @returns {Promise<void>} A promise that resolves once the connection is established or rejects if an error occurs.
 * 
 * @example
 * // Example usage: 
 * connectDB()
 *   .then(() => console.log("DB connected"))
 *   .catch((err) => console.error("Failed to connect to DB"));
 */
async function connectDB(): Promise<void> {
  const dbURI = process.env.DATABASE_URI as string;

  try {
    const conn = await mongoose.connect(dbURI);
    console.log(`Database connected successfully ${conn?.connection?.host}`);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(`Error ${err.message}`);
    } else {
      console.log(`An unknown error occurred`);
    }
    process.exit(1);
  }
}

export default connectDB;
