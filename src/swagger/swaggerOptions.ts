import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";

// Swagger definition
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Magic Transporters API",
      version: "1.0.0",
      description: "API documentation for the Magic Transporters service",
    },
    components: {
      schemas: {
        MagicMover: {
          type: "object",
          properties: {
            _id: { type: "string", description: "Magic Mover ID" },
            name: {
              type: "string",
              description: "The name of the magic mover",
            },
            weightLimit: {
              type: "number",
              description: "The maximum weight the magic mover can carry",
            },
            questState: {
              type: "string",
              enum: ["resting", "loading", "on-mission"],
              description:
                "The current state of the magic mover (resting, loading, or on-mission)",
            },
            completedMissions: {
              type: "number",
              description:
                "The number of missions the magic mover has completed",
            },
            items: {
              type: "array",
              items: { type: "string" },
              description: "Array of Magic Item IDs loaded on the magic mover",
            },
          },
        },
        MagicItem: {
          type: "object",
          properties: {
            _id: { type: "string", description: "Magic Item ID" },
            name: { type: "string", description: "Name of the magic item" },
            weight: { type: "number", description: "Weight of the magic item" },
          },
        },
        Log: {
          type: "object",
          properties: {
            _id: { type: "string", description: "Log ID" },
            mover: { type: "string", description: "Magic Mover ID" },
            items: {
              type: "array",
              items: { type: "string" },
              description: "Array of Magic Item IDs",
            },
            action: {
              type: "string",
              description: "Action (loading, starting mission, etc.)",
            },
          },
        },
      },
    },
  },
  apis: [
    path.resolve(__dirname, "../models/*.model.ts"),
    path.resolve(__dirname, "../routes/*.routes.ts"),
    path.resolve(__dirname, "../controllers/*.controller.ts"),
  ], // Specify the path to your files
};

export { swaggerJsdoc, swaggerUi, swaggerOptions };
