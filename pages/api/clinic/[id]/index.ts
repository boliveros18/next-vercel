import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";

import { db } from "../../../../database";
import { Clinic, IClinic } from "../../../../models";

type Data = { message: string } | IClinic;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "The id is invalid " + id });
  }

  switch (req.method) {
    case "PUT":
      return updateClinic(req, res);

    case "GET":
      return getClinic(req, res);

    case "DELETE":
      return deleteClinic(req, res);

    default:
      return res.status(400).json({
        message: "This method in clinic/[id] does not exist " + req.method,
      });
  }
}

const getClinic = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  await db.connect();
  const clinicInDB = await Clinic.findById(id);
  await db.disconnect();

  if (!clinicInDB) {
    return res
      .status(400)
      .json({ message: "There is no clinic with that ID: " + id });
  }

  return res.status(200).json(clinicInDB);
};

const updateClinic = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id } = req.query;

  await db.connect();

  const clinicToUpdate = await Clinic.findById(id);

  if (!clinicToUpdate) {
    await db.disconnect();
    return res
      .status(400)
      .json({ message: "There is no clinic with that ID: " + id });
  }

  const {
    type = clinicToUpdate.type,
    medic_id = clinicToUpdate.medic_id,
    certified = clinicToUpdate.certified,
    finantial = clinicToUpdate.finantial,
    speciality = clinicToUpdate.speciality,
    technology = clinicToUpdate.technology,
    phone = clinicToUpdate.phone,
    photo = clinicToUpdate.photo,
    name = clinicToUpdate.name,
    province = clinicToUpdate.province,
    state = clinicToUpdate.state,
    country = clinicToUpdate.country,
    address = clinicToUpdate.address,
    instagram = clinicToUpdate.instagram,
    qualification = clinicToUpdate.qualification,
    updatedAt = Date.now(),
  } = req.body;

  try {
    const updatedClinic = await Clinic.findByIdAndUpdate(
      id,
      {
        type,
        medic_id,
        certified,
        finantial,
        speciality,
        technology,
        phone,
        photo,
        name,
        province,
        state,
        country,
        address,
        instagram,
        qualification,
        updatedAt,
      },
      { runValidators: true, new: true }
    );
    await db.disconnect();
    res.status(200).json(updatedClinic!);
  } catch (error: any) {
    await db.disconnect();
    res.status(400).json({ message: error.errors.status.message });
  }
};

const deleteClinic = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id } = req.query;

  await db.connect();

  const clinicToDelete = await Clinic.findById(id);

  if (!clinicToDelete) {
    await db.disconnect();
    return res
      .status(400)
      .json({ message: "There is no clinic with that ID: " + id });
  }
  try {
    const deleteClinic = await Clinic.findByIdAndDelete(id);
    await db.disconnect();
    res.status(200).json(deleteClinic!);
  } catch (error: any) {
    await db.disconnect();
    res.status(400).json({ message: error.errors.status.message });
  }
};
