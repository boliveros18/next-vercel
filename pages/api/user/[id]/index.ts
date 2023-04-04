import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import { db, dbUsers } from "../../../../database";
import { User, IUser } from "../../../../models";
import { jwt, validations } from "../../../../utils";

type Data =
  | { message: string }
  | {
      token: string;
      user: {
        name: string;
        email: string;
        photo: string;
      };
    }
  | IUser
  | IUser[]
  | null;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "The id is invalid " + id });
  }

  switch (req.method) {
    case "PUT":
      return updateUser(req, res);

    case "GET":
      return getUser(req, res);

    case "DELETE":
      return deleteUser(req, res);

    default:
      return res.status(400).json({
        message: "This method in user/[id] does not exist " + req.method,
      });
  }
}

const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  try {
    const user = await dbUsers.getUserNameAndPhotoById(id);
    return res.status(201).json(user);
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      message: error.message || "Check server logs",
    });
  }
  return;
};

const updateUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  await db.connect();

  const userToUpdate = await User.findById(id);

  if (!userToUpdate) {
    await db.disconnect();
    return res
      .status(400)
      .json({ message: "There is no user with that ID: " + id });
  }

  const {
    name = userToUpdate.name,
    email = userToUpdate.email,
    password = userToUpdate.password,
    photo = userToUpdate.photo,
    role = userToUpdate.role,
    updateAt = Date.now(),
  } = req.body;

  if (password.length < 6) {
    return res.status(400).json({
      message: "Password must be at least 6 characters",
    });
  }

  if (name.length < 2) {
    return res.status(400).json({
      message: "The name must be at least 2 characters",
    });
  }

  if (!validations.isValidEmail(email)) {
    return res.status(400).json({
      message: "The mail does not have mail format",
    });
  }

  const user = await User.findOne({ email });

  if (user && (JSON.parse(JSON.stringify(user?._id)) !== id)) {
    return res.status(400).json({
      message: "You can't use that email",
    });


  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        name,
        email: email.toLocaleLowerCase(),
        password: bcrypt.hashSync(password),
        photo,
        role,
        updateAt,
      },
      { runValidators: true, new: true }
    );
    await db.disconnect();
    res.status(200).json(updatedUser!);
  } catch (error: any) {
    await db.disconnect();
    res.status(400).json({ message: error.errors.status.message });
  }
};

const deleteUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  await db.connect();

  const userToDelete = await User.findById(id);

  if (!userToDelete) {
    await db.disconnect();
    return res
      .status(400)
      .json({ message: "There is no user with that ID: " + id });
  }
  try {
    const deleteUser = await User.findByIdAndDelete(id);
    await db.disconnect();
    res.status(200).json(deleteUser!);
  } catch (error: any) {
    await db.disconnect();
    res.status(400).json({ message: error.errors.status.message });
  }
};
