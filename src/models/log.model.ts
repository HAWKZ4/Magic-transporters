import mongoose, { Schema, Document } from "mongoose";

/**
 * @typedef {Document} IMisssionLog
 * @property {mongoose.Types.ObjectId} mover - Reference to a Magic Mover.
 * @property {mongoose.Types.ObjectId[]} items - Array of Magic Item IDs associated with the mission.
 * @property {'loading' | 'unloading' | 'starting mission' | 'ending mission'} action - The type of action recorded in the log (e.g., 'loading', 'starting mission').
 * @property {Date} createdAt - Timestamp of when the log entry was created. (Automatically generated by Mongoose)
 * @property {Date} updatedAt - Timestamp of when the log entry was last updated. (Automatically generated by Mongoose)
 */
export interface IMisssionLog extends Document {
  mover: mongoose.Types.ObjectId; // Reference to Magic Mover
  items: mongoose.Types.ObjectId[]; // Array of Magic Item IDs
  action: "loading" | "unloading" | "starting mission" | "ending mission"; // Action type: loading or unloading
}

/**
 * Schema definition for the MissionLog model.
 * @type {Schema<IMisssionLog>}
 */
const LogSchema: Schema = new Schema(
  {
    mover: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MagicMover",
      required: true,
    },
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MagicItem",
        required: true,
      },
    ],
    action: {
      type: String,
      enum: ["loading", "starting mission", "ending mission"],
      required: true,
    },
  },
  {
    collection: "log",
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

/**
 * MissionLog model used for storing logs related to Magic Movers and their activities.
 * @returns {mongoose.Model<IMisssionLog>} The MissionLog model.
 */
export default mongoose.model<IMisssionLog>("Log", LogSchema);