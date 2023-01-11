import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { Certification, ICertification } from "../../../models";

type Data = { message: string } | ICertification;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getCertifications(res);
    default:
      return res.status(400).json({ message: "The endpoint does not exist" });
  }
}

const getCertifications = async (res: NextApiResponse<Data>) => {
  await db.connect();
  const certifications : any = await Certification.find().sort({
    createdAt: "ascending",
  });
  await db.disconnect();
  return res.status(200).json(certifications);
};
