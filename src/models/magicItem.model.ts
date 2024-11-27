import mongoose, { Schema, Document } from "mongoose";

/**
 * @interface IMagicItem
 * @description Interface representing a magic item document in MongoDB
 * @extends {Document}
 * @property {string} name - The name of the magic item
 * @property {number} weight - The weight of the magic item
 */
export interface IMagicItem extends Document {
  name: string;
  weight: number;
}

/**
 * @description Mongoose schema for the MagicItem model
 * @schema
 * @property {string} name - The name of the magic item (required)
 * @property {number} weight - The weight of the magic item (required)
 * @collection magic_items
 * @timestamps true
 */
const MagicItemSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
  },
  {
    collection: "magic_items",
    timestamps: true,
  }
);

/**
 * @description MagicItem model for interacting with the magic_items collection in MongoDB
 * @model MagicItem
 */
export default mongoose.model<IMagicItem>("MagicItem", MagicItemSchema);
