import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { Clinic, IClinic } from "../../../models";

type Data = { message: string } | IClinic;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getClinics(res);
    default:
      return res.status(400).json({ message: "The endpoint does not exist" });
  }
}

const getClinics = async (res: NextApiResponse<Data>) => {
  await db.connect();
  const clinics : any = await Clinic.find().sort({
    createdAt: "ascending",
  });
  await db.disconnect();
  return res.status(200).json(clinics);
};
