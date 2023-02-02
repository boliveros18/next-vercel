import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { Answer, IAnswer } from "../../../models";
import { getSession } from "next-auth/react";

type Data = { message: string } | IAnswer;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return createModel(req, res);
    case "GET":
      return getAnswers(res);
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
    parent_id = "",
    user_photo = "",
    user_name = "",
    user_id = "",
    description = "",
    user_tag_id = "",
    user_tag_name = "",
    createdAt = Date.now(),
    updatedAt = 0,
  } = req.body
  await db.connect();

  const newModel = new Answer({
    parent_id,
    user_photo,
    user_name,
    user_id,
    description,
    user_tag_id,
    user_tag_name,
    createdAt,
    updatedAt
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


const getAnswers = async (res: NextApiResponse<Data>) => {
  await db.connect();
  const answers : any = await Answer.find().sort({
    createdAt: "ascending",
  });
  await db.disconnect();
  return res.status(200).json(answers);
};
