import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { Qualification, IQualification } from "../../../models";

type Data = { message: string } | IQualification;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getQualifications(res);
    default:
      return res.status(400).json({ message: "The endpoint does not exist" });
  }
}

const getQualifications = async (res: NextApiResponse<Data>) => {
  await db.connect();
  const qualifications : any = await Qualification.find().sort({
    createdAt: "ascending",
  });
  await db.disconnect();
  return res.status(200).json(qualifications);
};
