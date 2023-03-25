import mongoose, { Model, Schema } from "mongoose";
import { Medic } from '../interfaces';

export interface IMedic extends Medic {}

const entrySchema = new Schema({
  parent_id: { type: String, require: true },
  card_id: { type: String },
  to_approve: { type: Boolean },
  contract_signature: { type: String },
  available_days: { type: String },
  curriculum: { type: String },
  qualification: { type: String },
  comments: { type: String },
  instagram: { type: String },
  country: { type: String },
  state: { type: String },
  province: { type: String },
  createdAt: { type: Number },
  updatedAt: { type: Number },
});

const MedicModel: Model<IMedic> =
  mongoose.models.Medic || mongoose.model("Medic", entrySchema);

export default MedicModel;
