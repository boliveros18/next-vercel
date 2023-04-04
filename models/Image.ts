import mongoose, { Model, Schema } from "mongoose";
import { Image } from "../interfaces";

export interface IImage extends Image {}

const entrySchema = new Schema({
  parent_id: { type: String, require: true },
  url: { type: String, require: true },
});

const ImageModel: Model<IImage> =
  mongoose.models.Image || mongoose.model("Image", entrySchema);

export default ImageModel;
