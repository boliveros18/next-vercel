import mongoose, { Model, Schema } from "mongoose";
import { Like } from '../interfaces';

export interface ILike extends Like {}

const entrySchema = new Schema({
  parent_id: { type: String },
  user_id: { type: String, require: true },
  user_name: { type: String, require: true },
});

const LikeModel: Model<ILike> =
  mongoose.models.Like || mongoose.model("Like", entrySchema);

export default LikeModel;
