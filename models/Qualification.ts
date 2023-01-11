import mongoose, { Model, Schema } from "mongoose";
import { Qualification } from '../interfaces';

export interface IQualification extends Qualification {}

const entrySchema = new Schema({
  parent_id: { type: String, require: true },
  user_id: { type: String, require: true },
  user_name: { type: String, require: true },
  approved: { type: Boolean},
  stars: { type: Number},
  average: { type: Number},
});

const QualificationModel: Model<IQualification> =
  mongoose.models.Qualification || mongoose.model("Qualification", entrySchema);

export default QualificationModel;
