import { isValidObjectId } from "mongoose";
import { db, dbUsers } from ".";
import { Comment, IComment, Like } from "../models";

export const getCommentById = async (id: string): Promise<IComment | null> => {
  if (!isValidObjectId(id)) {
    return null;
  }
  await db.connect();
  const comment = await Comment.findById(id).lean();
  await db.disconnect();
  return JSON.parse(JSON.stringify(comment));
};

export const getCommentListByParentId = async (
  parent_id: string
): Promise<IComment[]> => {
  const params = parent_id ? { parent_id: parent_id } : {};
  await db.connect();
  const comments: IComment[] = await Comment.find(params).sort({
    createdAt: "ascending",
  });
  await db.disconnect();
  return comments;
};

export const getCommentsByParentId = async (
  parent_id: string
): Promise<IComment[]> => {
  const params = parent_id ? { parent_id: parent_id } : {};
  await db.connect();
  const comments: IComment[] = await Comment.find(params).sort({
    createdAt: "ascending",
  });
  for (let i = 0; i < comments.length; i++) {
    let user = await dbUsers.getUserNameAndPhotoById(comments[i].user_id);
    if (user) {
      comments[i].user_name = user.name;
      comments[i].user_photo = user.photo;
    }
  }
  await db.disconnect();
  return comments;
};

export const getCommentsLengthByParentId = async (
  parent_id?: string
): Promise<number> => {
  const params = parent_id ? { parent_id: parent_id } : {};
  await db.connect();
  const comments: number = await Comment.find(params).count();
  await db.disconnect();
  return comments;
};

export const deleteCommentLikesAndChildren = async (comment_id: string) => {
  await db.connect();

  await Like.deleteMany({ parent_id: comment_id });

  const comments = await getCommentListByParentId(comment_id);
  comments.forEach(async (comment) => {
    await Comment.findByIdAndDelete(comment._id);
    await Like.deleteMany({ parent_id: comment._id });
  });

  await db.disconnect();
};
