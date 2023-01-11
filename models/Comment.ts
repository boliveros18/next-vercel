import mongoose, { Model, Schema } from "mongoose";
import { Comment } from '../interfaces';

export interface IComment extends Comment {}

const entrySchema = new Schema({
  parent_id: { type: String, require: true },
  user_photo: { type: String },
  user_name: { type: String, require: true },
  user_id: { type: String, require: true },
  description: { type: String, require: true },
  createdAt: { type: Number },
  updatedAt: { type: Number },
});

const CommentModel: Model<IComment> =
  mongoose.models.Comment || mongoose.model("Comment", entrySchema);

export default CommentModel;
