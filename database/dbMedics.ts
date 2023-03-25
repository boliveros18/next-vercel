import { isValidObjectId } from "mongoose";
import { db } from ".";
import { Medic, IMedic } from "../models";

export const getMedicById = async (id: string): Promise<IMedic | null> => {
  if (!isValidObjectId(id)) {
    return null;
  }
  await db.connect();
  const medic = await Medic.findById(id).lean();
  await db.disconnect();
  return JSON.parse(JSON.stringify(medic));
};

export const getMedics = async (): Promise<IMedic[]> => {
  await db.connect();
  const medics = await Medic.find().sort({qualification: -1}).lean();
  await db.disconnect();
  return JSON.parse(JSON.stringify(medics));
};

export const createMedic = async (payload: IMedic): Promise<IMedic> => {
  await db.connect();
  const medic = await Medic.create(payload);
  await db.disconnect();
  return JSON.parse(JSON.stringify(medic));
};



