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

export const getAllLikes = async (): Promise<ILike[]> => {
  await db.connect();
  const likes = await Like.find().lean();
  await db.disconnect();

  return JSON.parse(JSON.stringify(likes));
};

export const getLikeByParentIdAndUserId = async (
  parent_id: string,
  user_id: string
): Promise<ILike | null> => {
  await db.connect();
  const like = await await Like.find({
    parent_id: parent_id,
    user_id: user_id,
  });
  await db.disconnect();
  if (like[0] === undefined) {
    return null
  }
  return JSON.parse(JSON.stringify(like[0]));
};

export const getLikeLengthByParentId = async (
  parent_id: string
)  => {
  await db.connect();
  const like: number = await Like.find({
    parent_id: parent_id,
  }).count()
  await db.disconnect();
  return JSON.parse(JSON.stringify(like));
};

export const getLikesByParentId = async (
  parent_id: string
): Promise<ILike | {}> => {
  await db.connect();
  const like = await await Like.find({
    parent_id: parent_id
  });
  await db.disconnect();
  return JSON.parse(JSON.stringify(like[0]));
};