import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { getSession } from "next-auth/react";

import { db } from "../../../../database";
import { Answer, IAnswer } from "../../../../models";


type Data = { message: string } | IAnswer;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "The id is invalid " + id });
  }

  switch (req.method) {
    case "POST":
      return createModel(req, res);

    case "PUT":
      return updateModel(req, res);

    case "GET":
      return getModel(req, res);

    case "DELETE":
      return deleteModel(req, res);

    default:
      return res.status(400).json({
        message: "This method in answer/[id] does not exist " + req.method,
      });
  }
}

const createModel = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const session: any = await getSession({ req });
  if (!session) {
    return res
      .status(401)
      .json({ message: "You must be authenticated to do this" });
  }

  await db.connect();

  const newModel = new Answer({
    user_id: session.user._id,
    user_name: session.user.name,
    user_photo: session.user.avatar,
  });

  try {
    await newModel.save();
    await db.disconnect();
    return res.status(201).json(newModel);
  } catch (error: any) {
    await db.disconnect();
    console.log(error);
    res.status(400).json({
      message: error.message || "Check server logs",
    });
  }
};

const getModel = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  await db.connect();
  const modelInDB = await Answer.findById(id);
  await db.disconnect();

  if (!modelInDB) {
    return res
      .status(400)
      .json({ message: "There is no answer with that ID: " + id });
  }

  return res.status(200).json(modelInDB);
};

const updateModel = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  await db.connect();

  const modelToUpdate = await Answer.findById(id);

  if (!modelToUpdate) {
    await db.disconnect();
    return res
      .status(400)
      .json({ message: "There is no answer with that ID: " + id });
  }

  const {
    user_photo = modelToUpdate.user_photo,
    user_name = modelToUpdate.user_name,
    user_id = modelToUpdate.user_id,
    description = modelToUpdate.description,
    user_tag_id = modelToUpdate.user_tag_id,
    user_tag_name = modelToUpdate.user_tag_name,
    updatedAt = modelToUpdate.updatedAt,
  } = req.body;

  try {
    const updatedModel = await Answer.findByIdAndUpdate(
      id,
      {
        user_photo,
        user_name,
        user_id,
        description,
        user_tag_id,
        user_tag_name,
        updatedAt,
      },
      { runValidators: true, new: true }
    );
    await db.disconnect();
    res.status(200).json(updatedModel!);
  } catch (error: any) {
    await db.disconnect();
    res.status(400).json({ message: error.errors.status.message });
  }
};

const deleteModel = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  await db.connect();

  const modelToDelete = await Answer.findById(id);

  if (!modelToDelete) {
    await db.disconnect();
    return res
      .status(400)
      .json({ message: "There is no answer with that ID: " + id });
  }

  try {
    const deleteModel = await Answer.findByIdAndDelete(id);
    await db.disconnect();
    res.status(200).json(deleteModel!);
  } catch (error: any) {
    await db.disconnect();
    res.status(400).json({ message: error.errors.status.message });
  }
};
