import { isValidObjectId } from "mongoose";
import { db } from ".";
import { Answer, IAnswer } from "../models";

export const getAnswerById = async (id: string): Promise<IAnswer | null> => {
  if (!isValidObjectId(id)) {
    return null;
  }

  await db.connect();
  const answer = await Answer.findById(id).lean();
  await db.disconnect();

  return JSON.parse(JSON.stringify(answer));
};

export const getAllAnswers = async (): Promise<IAnswer[]> => {
  await db.connect();
  const answers = await Answer.find().lean();
  await db.disconnect();

  return JSON.parse(JSON.stringify(answers));
};
