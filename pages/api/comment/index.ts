import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { Comment, IComment } from "../../../models";

type Data = { message: string } | IComment;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getComments(res);
    default:
      return res.status(400).json({ message: "The endpoint does not exist" });
  }
}

const getComments = async (res: NextApiResponse<Data>) => {
  await db.connect();
  const comments : any = await Comment.find().sort({
    createdAt: "ascending",
  });
  await db.disconnect();
  return res.status(200).json(comments);
};
