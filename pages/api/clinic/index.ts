import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { Clinic, IClinic } from "../../../models";
import { getSession } from "next-auth/react";

type Data = { message: string } | IClinic;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return createModel(req, res);
    case "GET":
      return getClinics(res);
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
    type = "clinic",
    certified = false,
    finantial = "",
    speciality = "",
    technology = "",
    phone = "",
    avatar = "",
    photo = "",
    name = "",
    province = "",
    state = "",
    country = "",
    address = "",
    instagram = "",
    qualification = 0,
    comments = 0,
    likes = 0,
    createdAt = Date.now(),
    updatedAt = 0,
  } = req.body
  await db.connect();

  const newModel = new Clinic({
    type,
    certified,
    finantial,
    speciality,
    technology,
    phone,
    avatar,
    photo,
    name,
    province,
    state,
    country,
    address,
    instagram,
    qualification,
    comments,
    likes,
    createdAt,
    updatedAt,
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


const getClinics = async (res: NextApiResponse<Data>) => {
  await db.connect();
  const clinics : any = await Clinic.find().sort({
    createdAt: "ascending",
  });
  await db.disconnect();
  return res.status(200).json(clinics);
};
