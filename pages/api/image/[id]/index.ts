import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { db } from "../../../../database";
import { Image, IImage } from "../../../../models";

type Data = { message: string } | IImage;

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
      return updateModel(req, res);
    default:
      return res.status(400).json({
        message: "This method in comment/[id] does not exist " + req.method,
      });
  }
}

const updateModel = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  await db.connect();

  const modelToUpdate = await Image.findById(id);

  if (!modelToUpdate) {
    await db.disconnect();
    return res
      .status(400)
      .json({ message: "There is no comment with that ID: " + id });
  }

  const { url = modelToUpdate.url } = req.body;

  try {
    const updatedModel = await Image.findByIdAndUpdate(
      id,
      {
        url,
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
