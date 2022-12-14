import { isValidObjectId } from "mongoose";
import { db } from ".";
import { Clinic, IClinic } from "../models";

export const getClinicById = async (id: string): Promise<IClinic | null> => {
  if (!isValidObjectId(id)) {
    return null;
  }

  await db.connect();
  const clinic = await Clinic.findById(id).lean();
  await db.disconnect();

  return JSON.parse(JSON.stringify(clinic));
};

export const getAllClinics = async (): Promise<IClinic> => {
  await db.connect();
  const clinics = await Clinic.find().lean();
  await db.disconnect();

  return JSON.parse(JSON.stringify(clinics));
};
