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

export const getCommentsByParentId2 = async (parent_id?: string): Promise<IComment[]> => {
  const params = parent_id ? {parent_id: parent_id} : {};
  await db.connect();
  const comments : IComment[] = await Comment.find(params).sort({
    createdAt: "ascending",
  });
  await db.disconnect();

  return comments;
};

export const getCommentsLengthByParentId = async (parent_id?: string): Promise<number> => {
  const params = parent_id ? {parent_id: parent_id} : {};
  await db.connect();
  const comments : number = await Comment.find(params).count()
  await db.disconnect();
  return comments;
};

export const getCommentsByParentId = async (
  parent_id: string
): Promise<IComment[] | null> => {
  await db.connect();
  const comments =  await Comment.find({
    parent_id: parent_id 
  })
  await db.disconnect();
  if (comments === undefined) {
    return null
  }
  return JSON.parse(JSON.stringify(comments));
};

 