import { isValidObjectId } from "mongoose";
import { db } from ".";
import { Comment, IComment } from "../models";

export const getCommentById = async (id: string): Promise<IComment | null> => {
  if (!isValidObjectId(id)) {
    return null;
  }

  await db.connect();
  const comment = await Comment.findById(id).lean();
  await db.disconnect();

  return JSON.parse(JSON.stringify(comment));
};

export const getAllComments = async (): Promise<IComment> => {
  await db.connect();
  const comments = await Comment.find().lean();
  await db.disconnect();

  return JSON.parse(JSON.stringify(comments));
};
