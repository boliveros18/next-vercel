// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { db, seedData  } from "../../database";
import { Clinic, User } from "../../models";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (process.env.NODE_ENV === "production") {
    return res
      .status(401)
      .json({ message: "You do not have access to this service" });
  }
  await db.connect();
  await User.deleteMany();
  await User.insertMany( seedData.users );
  await Clinic.deleteMany();
  await Clinic.insertMany( seedData.clinics );

  await db.disconnect();

  res.status(200).json({ message: "Process done correctly" });
}
