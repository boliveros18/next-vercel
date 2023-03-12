import mongoose, { Model, Schema } from "mongoose";
import { Comment } from '../interfaces';

export interface IComment extends Comment {}

const entrySchema = new Schema({
  type: { type: String },
  parent_id: { type: String, require: true },
  user_photo: { type: String },
  user_name: { type: String, require: true },
  user_id: { type: String, require: true },
  description: { type: String, require: true },
  user_tag_id: { type: String },
  user_tag_name: { type: String },
  answers: { type: Number},
  createdAt: { type: Number },
  updatedAt: { type: Number },
});

const CommentModel: Model<IComment> =
  mongoose.models.Comment || mongoose.model("Comment", entrySchema);

export default CommentModel;
