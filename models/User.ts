import mongoose, { Schema, model, Model } from "mongoose";
import { User } from "../interfaces";

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

const User: Model<User> = mongoose.models.User || model("User", userSchema);

export default User;
