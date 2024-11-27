import mongoose, { Schema, Document } from "mongoose";

/**
 * @interface IMagicMover
 * @description Interface representing a magic mover document in MongoDB
 * @extends {Document}
 * @property {string} name - The name of the magic mover
 * @property {number} weightLimit - The weight limit the magic mover can carry
 * @property {string} questState - The current state of the magic mover (resting, loading, or on-mission)
 * @property {number} completedMissions - The number of missions the magic mover has completed
 * @property {mongoose.Types.ObjectId[]} items - Array of magic item IDs loaded on the magic mover
 */
export interface IMagicMover extends Document {
  name: string;
  weightLimit: number;
  questState: "resting" | "loading" | "on-mission";
  completedMissions: number;
  items: mongoose.Types.ObjectId[];
}

/**
 * @description Mongoose schema for the MagicMover model
 * @schema
 * @property {string} name - The name of the magic mover (required)
 * @property {number} weightLimit - The maximum weight the magic mover can carry (required)
 * @property {string} questState - The current state of the magic mover. Defaults to 'resting'. Possible values are 'resting', 'loading', or 'on-mission'.
 * @property {number} completedMissions - The number of missions completed by the magic mover. Defaults to 0.
 * @property {mongoose.Types.ObjectId[]} items - Array of ObjectId references to the magic items loaded on the magic mover.
 * @collection magic_movers
 * @timestamps true
 */
const MagicMoverSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    weightLimit: {
      type: Number,
      required: true,
    },
    questState: {
      type: String,
      enum: ["resting", "loading", "on-mission"],
      default: "resting",
    },
    completedMissions: {
      type: Number,
      default: 0,
    },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: "MagicItem" }],
  },
  {
    collection: "magic_movers",
    timestamps: true,
  }
);

/**
 * @description MagicMover model for interacting with the magic_movers collection in MongoDB
 * @model MagicMover
 */
export default mongoose.model<IMagicMover>("MagicMover", MagicMoverSchema);
