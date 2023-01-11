import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";

import { db } from "../../../../database";
import { User } from "../../../../models";

type Data = { message: string } | User;

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

  await db.connect();
  const userInDB = await User.findById(id);
  await db.disconnect();

  if (!userInDB) {
    return res
      .status(400)
      .json({ message: "There is no user with that ID: " + id });
  }

  return res.status(200).json(userInDB);
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
    role = userToUpdate.role,
    updateAt = userToUpdate.updatedAt
} = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        name,
        email,
        password,
        role,
        updateAt
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
