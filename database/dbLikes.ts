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

export const getLikesByGrandParentId = async (
  grandparent_id: string
): Promise<ILike[]> => {
  const params = grandparent_id ? { grandparent_id: grandparent_id } : {};
  await db.connect();
  const likes: ILike[] = await Like.find(params).sort({
    createdAt: "ascending",
  });
  await db.disconnect();
  return likes;
};

export const getLikesLengthByParentId = async (
  parent_id: string
): Promise<number> => {
  const params = parent_id ? { parent_id: parent_id } : {};
  await db.connect();
  const likes: number = await Like.find(params).count();
  await db.disconnect();
  return likes;
};

export const getLikeByParentIdAndUserId = async (
  parent_id: string,
  user_id: string
): Promise<ILike[]> => {
  await db.connect();
  const params =
    parent_id && user_id ? { parent_id: parent_id, user_id: user_id } : {};
  const like: ILike[] = await Like.find(params);
  await db.disconnect();
  return JSON.parse(JSON.stringify(like));
};
