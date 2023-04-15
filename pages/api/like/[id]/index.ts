import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { Clinic } from "../../../../models";
import { db } from "../../../../database";
import { Like, ILike } from "../../../../models";
import { Comment } from "../../../../models";
import { getLikesLengthByParentId } from "../../../../database/dbLikes";

type Data = { message: string } | ILike;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "The id is invalid " + id });
  }

  switch (req.method) {
    case "GET":
      return getModel(req, res);

    case "DELETE":
      return deleteModel(req, res);

    default:
      return res.status(400).json({
        message: "This method in like/[id] does not exist " + req.method,
      });
  }
}

const getModel = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  await db.connect();
  const modelInDB = await Like.findById(id);
  await db.disconnect();

  if (!modelInDB) {
    return res
      .status(400)
      .json({ message: "There is no like with that ID: " + id });
  }

  return res.status(200).json(modelInDB);
};

const deleteModel = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  await db.connect();

  const modelToDelete = await Like.findById(id);

  if (!modelToDelete) {
    await db.disconnect();
    return res
      .status(400)
      .json({ message: "There is no like with that ID: " + id });
  }
  try {
    const deleteModel = await Like.findByIdAndDelete(id);
    switch (modelToDelete.grandparent_id) {
      case "": {
        //DELETING MAIN.LIKES NUMBER
        const likes = await getLikesLengthByParentId(modelToDelete.parent_id);
        await Clinic.findByIdAndUpdate(
          modelToDelete.parent_id,
          { likes },
          { runValidators: true, new: true }
        );
        break;
      }
      //DELETING MAIN COMMENTS LIKES NUMBER
      default: {
        if (deleteModel) {
          const likes = await getLikesLengthByParentId(modelToDelete.parent_id);
          await Comment.findByIdAndUpdate(
            modelToDelete.parent_id,
            { likes },
            { runValidators: true, new: true }
          );
        }
      }
    }
    await db.disconnect();
    res.status(200).json(deleteModel!);
  } catch (error: any) {
    await db.disconnect();
    res.status(400).json({ message: error.errors.status.message });
  }
};
