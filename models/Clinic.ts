import mongoose, { Model, Schema } from "mongoose";
import { Clinic } from "../interfaces";

export interface IClinic extends Clinic {}

const entrySchema = new Schema({
  certified: { type: Boolean },
  finantial: { type: String, require: true },
  speciality: { type: String, require: true },
  technology: { type: String, require: true },
  avatar: { type: String, require: true },
  photo: { type: String, require: true },
  name: { type: String, require: true },
  city: { type: String, require: true },
  country: { type: String, require: true },
  address: { type: String, require: true },
  createdAt: { type: Number },
  updatedAt: { type: Number },
});

const ClinicModel: Model<IClinic> =
  mongoose.models.Clinic || mongoose.model("Clinic", entrySchema);

export default ClinicModel;
