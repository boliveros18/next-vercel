import mongoose, { Model, Schema } from "mongoose";
import { Answer } from '../interfaces';

export interface IAnswer extends Answer {}

const entrySchema = new Schema({
  parent_id: { type: String, require: true },
  user_photo: { type: String },
  user_name: { type: String, require: true },
  user_id: { type: String, require: true },
  description: { type: String, require: true },
  user_tag_id: { type: String, require: true },
  user_tag_name: { type: String, require: true },
  createdAt: { type: Number },
  updatedAt: { type: Number },
});

const AnswerModel: Model<IAnswer> =
  mongoose.models.Answer || mongoose.model("Answer", entrySchema);

export default AnswerModel;
