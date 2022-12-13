import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { db } from "../../../database";
import { Clinic, IClinic } from "../../../models";

type Data = { message: string } | IClinic;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "The id is invalid " + id });
  }

  switch (req.method) {
    case "GET":
      return getClinic(req, res);
    default:
      return res.status(400).json({ message: "The endpoint does not exist" });
  }
}

const getClinic = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  await db.connect();
  const entryInDB = await Clinic.findById(id);
  await db.disconnect();

  if (!entryInDB) {
    return res
      .status(400)
      .json({ message: "There is no entry with that ID: " + id });
  }

  return res.status(200).json(entryInDB);
};
