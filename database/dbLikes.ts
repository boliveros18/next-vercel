import { isValidObjectId } from "mongoose";
import { db } from ".";
import { Like, ILike } from "../models";

export const getLikeById = async (id: string): Promise<ILike | null> => {
  if (!isValidObjectId(id)) {
    return null;
  }

  await db.connect();
  const like = await Like.findById(id).lean();
  await db.disconnect();

  return JSON.parse(JSON.stringify(like));
};

export const getAllLikes = async (): Promise<ILike> => {
  await db.connect();
  const likes = await Like.find().lean();
  await db.disconnect();

  return JSON.parse(JSON.stringify(likes));
};
