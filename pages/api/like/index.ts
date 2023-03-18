import type { NextApiRequest, NextApiResponse } from "next";
import { db, dbLikes } from "../../../database";
import { Like, ILike } from "../../../models";
import { Comment } from "../../../models";
import { getSession } from "next-auth/react";
import { getLikesLengthByParentId } from "../../../database/dbLikes";
import { Clinic } from "../../../models";
import { getCommentById } from "../../../database/dbComments";

type Data = { message: string } | ILike | ILike[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return createModel(req, res);
    case "GET":
      return getLikes(req, res);
    default:
      return res.status(400).json({ message: "The endpoint does not exist" });
  }
}

const createModel = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const session: any = await getSession({ req });
  if (!session) {
    return res
      .status(401)
      .json({ message: "You must be authenticated to do this" });
  }

  const {
    user_id = "",
    user_name = "",
    grandparent_id = "",
    parent_id = "",
  } = req.body;
  await db.connect();

  const newModel = new Like({
    user_id,
    user_name,
    grandparent_id,
    parent_id,
  });

  try {
    await newModel.save();
    switch (grandparent_id) {
      case "": {
        //UPDATING MAIN.LIKES NUMBER
        const likes = await getLikesLengthByParentId(parent_id);
        await Clinic.findByIdAndUpdate(
          parent_id,
          { likes },
          { runValidators: true, new: true }
        );
        break;
      }
      default: {
        //UPDATING MAIN LIKES ANSWERS NUMBER
        const parent = await getCommentById(parent_id);
        if (parent) {
          const likes = await getLikesLengthByParentId(parent._id);
          await Comment.findByIdAndUpdate(
            parent._id,
            { likes },
            { runValidators: true, new: true }
          );
        }
      }
    }
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

const getLikes = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const likes = await dbLikes.getLikesByGrandParentId(
      req.query.grandparent_id as string
    );
    return res.status(201).json(likes);
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      message: error.message || "Check server logs",
    });
  }
  return;
};
