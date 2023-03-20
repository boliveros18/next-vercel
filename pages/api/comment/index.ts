import type { NextApiRequest, NextApiResponse } from "next";
import { db, dbComments } from "../../../database";
import { Comment, IComment } from "../../../models";
import { Clinic } from "../../../models";
import { getSession } from "next-auth/react";
import {
  getCommentsLengthByParentId,
  getCommentById,
} from "../../../database/dbComments";

type Data = { message: string } | IComment | IComment[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return createModel(req, res);
    case "GET":
      return getComments(req, res);
    default:
      return res.status(400).json({ message: "The endpoint does not exist" });
  }
}

const createModel = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const session = await getSession({ req });
  if (!session) {
    return res
      .status(401)
      .json({ message: "You must be authenticated to do this" });
  }

  const {
    type = "",
    parent_id = "",
    user_id = "",
    user_name = "",
    user_photo = "",
    description = "",
    user_tag_id = "",
    user_tag_name = "",
    answers = 0,
    likes = 0,
    createdAt = Date.now(),
    updatedAt = 0,
  } = req.body;
  await db.connect();

  const newModel = new Comment({
    type,
    parent_id,
    user_id,
    user_name,
    user_photo,
    description,
    user_tag_id,
    user_tag_name,
    answers,
    likes,
    createdAt,
    updatedAt,
  });

  try {
    await newModel.save();
    switch (type) {
      case "": {
        //UPDATING MAIN COMMENTS ANSWERS NUMBER
        const parent = await getCommentById(parent_id);
        if (parent) {
          const answers = await getCommentsLengthByParentId(parent._id);
          await Comment.findByIdAndUpdate(
            parent._id,
            { answers },
            { runValidators: true, new: true }
          );
        }
        break;
      }
      //UPDATING MAIN.COMMENTS NUMBER
      case "clinic": {
        const comments = await getCommentsLengthByParentId(parent_id);
        await Clinic.findByIdAndUpdate(
          parent_id,
          { comments },
          { runValidators: true, new: true }
        );
        break;
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

const getComments = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const comments = await dbComments.getCommentsByParentId(
      req.query.parent_id as string
    );
    return res.status(201).json(comments);
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      message: error.message || "Check server logs",
    });
  }
  return;
};
