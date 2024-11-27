import dotenv from "dotenv";
import express from "express";
import magicMoverRoutes from "./routes/magicMover.routes";
import magicItemRoutes from "./routes/magicItem.routes";
import logRoutes from "./routes/log.routes";
import connectDB from "./utils/dbConn";
import { errorHandler, notFound } from "./middlewares/errorHandling.middleware";
import {
  swaggerJsdoc,
  swaggerOptions,
  swaggerUi,
} from "./swagger/swaggerOptions";

// Load environment variables from a .env file
dotenv.config();

// Set the port to use from the environment, default to 8000
const PORT = process.env.PORT || 8000;

// Create an instance of the Express app
const app = express();

/**
 * @function initializeServer
 * @description Initializes the server, connects to the database, and sets up routes and middleware.
 * @returns {void} Nothing is returned; the server starts listening on the specified port.
 *
 * @example
 * // Initialize the server
 * initializeServer();
 */
const initializeServer = (): void => {
  // Connect to the database
  connectDB();

  // Set up Swagger
  const swaggerDocs = swaggerJsdoc(swaggerOptions); // Generate the Swagger documentation from the options

  // Use middleware to parse JSON requests
  app.use(express.json());

  // Swagger UI route
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

  // Set up routes
  app.use("/api/magic-movers", magicMoverRoutes);
  app.use("/api/magic-items", magicItemRoutes);
  app.use("/api/logs", logRoutes);

  // Use the "Not Found" handler
  app.use(notFound);

  // Use the general error handler
  app.use(errorHandler);

  // Start the server and listen on the specified port
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
};

// Initialize the server
initializeServer();
