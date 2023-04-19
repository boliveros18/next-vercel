import type { NextApiRequest, NextApiResponse } from "next";
import { db, dbLikes } from "../../../database";
import { Like, ILike } from "../../../models";
import { getSession } from "next-auth/react";
import { getLikesLengthByParentId } from "../../../database/dbLikes";
import mongoose from "mongoose";

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

  const { user_id = "", user_name = "", parent_id = "", type = "" } = req.body;
  await db.connect();

  const newModel = new Like({
    user_id,
    user_name,
    parent_id,
    type,
  });

  try {
    await newModel.save();
    const likes = await getLikesLengthByParentId(parent_id);
    await mongoose
      .model(type)
      .findByIdAndUpdate(
        parent_id,
        { likes },
        { runValidators: true, new: true }
      );
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
    const likes = await dbLikes.getLikesByParentId(
      req.query.parent_id as string
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
