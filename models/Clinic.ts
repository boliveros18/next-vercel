import mongoose, { Model, Schema } from "mongoose";
import { Clinic } from "../interfaces";

export interface IClinic extends Clinic {}

const entrySchema = new Schema({
  category: {
    type: String,
    enum: {
      values: ["principal", "general"],
      message: "{VALUE} is not an allowed state ",
    },
    default: "general",
  },
  certified: { type: String },
  finantial:{ type: String, require: true  },
  speciality:{ type: String, require: true },
  technology:{ type: String, require: true },
  avatar: { type: String, require: true },
  photo: { type: String, require: true },
  name: { type: String, require: true },
  city: { type: String, require: true },
  country: { type: String, require: true },
  instagram: { type: String, require: true },
  qualification: { type: Number },
  certifications: { type: String },
  address: { type: String, require: true },
  comments: []
});

const ClinicModel: Model<IClinic> =
  mongoose.models.Clinic || mongoose.model("Clinic", entrySchema);

export default ClinicModel;
