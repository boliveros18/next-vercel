import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { Answer, IAnswer } from "../../../models";

type Data = { message: string } | IAnswer;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getAnswers(res);
    default:
      return res.status(400).json({ message: "The endpoint does not exist" });
  }
}

const getAnswers = async (res: NextApiResponse<Data>) => {
  await db.connect();
  const answers : any = await Answer.find().sort({
    createdAt: "ascending",
  });
  await db.disconnect();
  return res.status(200).json(answers);
};
