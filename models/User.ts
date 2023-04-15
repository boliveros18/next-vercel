import mongoose, { Schema, Model } from "mongoose";
import { User } from "../interfaces";

export interface IUser extends User {}

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: {
        values: ["admin", "client", "medic"],
        message: "{VALUE} is a wrong value",
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

const UserModel: Model<IUser> =
  mongoose.models.User || mongoose.model("User", userSchema);

export default UserModel;
