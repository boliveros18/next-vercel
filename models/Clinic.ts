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
  certified: { type: Boolean },
  finantial: { type: String, require: true },
  speciality: { type: String, require: true },
  technology: { type: String, require: true },
  avatar: { type: String, require: true },
  photo: { type: String, require: true },
  name: { type: String, require: true },
  city: { type: String, require: true },
  country: { type: String, require: true },
  instagram: {
    name: String,
    link: String,
  },
  qualification: {
    status: Boolean,
    number: Number,
    current: Number,
    new: Number,
  },
  certifications: {
    name: String,
    description: String,
    logo: String,
  },
  address: { type: String, require: true },
  comments: [
    {
      user_photo: String,
      user_name: String,
      user_id: String,
      description: String,
      approved: Boolean,
      likes: Number,
      createdAt: Number,
      answers: [],
    },
  ],
});

const ClinicModel: Model<IClinic> =
  mongoose.models.Clinic || mongoose.model("Clinic", entrySchema);

export default ClinicModel;
