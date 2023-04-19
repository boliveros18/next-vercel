import { isValidObjectId } from "mongoose";
import { db, dbImages, dbUsers } from ".";
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

export const getCommentList = async (
  parent_id: string,
  user_id: string
): Promise<IComment[]> => {
  const params: any = parent_id ? { parent_id: parent_id } : {};
  if (user_id) {
    params["user_id"] = user_id;
  }
  await db.connect();
  const comments: IComment[] = await Comment.find(params).sort({
    createdAt: "ascending",
  });
  await db.disconnect();
  return comments;
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
  const userIds = Array.from(new Set(comments.map((item) => item.user_id)));
  let images = await dbImages.getImagesByParentId(userIds);
  let users = await dbUsers.getUsersbyId(userIds);
  const res: IComment[] = comments.map((comment) => {
    let image = images.find((image) => image.parent_id === comment.user_id);
    let user = users.find((user) => user._id === comment.user_id);
    image ? (comment.user_photo = image.url) : null;
    user ? (comment.user_name = user.name) : null;
    return comment;
  });

  await db.disconnect();
  return res;
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
