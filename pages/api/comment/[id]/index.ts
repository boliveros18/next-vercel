import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { Clinic } from "../../../../models";
import { db } from "../../../../database";
import { Comment, IComment } from "../../../../models";
import { getCommentsLengthByParentId, getCommentById } from '../../../../database/dbComments';

type Data = { message: string } | IComment;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "The id is invalid " + id });
  }

  switch (req.method) {
    case "PUT":
      return updateModel(req, res);

    case "GET":
      return getModel(req, res);

    case "DELETE":
      return deleteModel(req, res);

    default:
      return res
        .status(400)
        .json({
          message: "This method in comment/[id] does not exist " + req.method,
        });
  }
}

const getModel = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  await db.connect();
  const modelInDB = await Comment.findById(id);
  await db.disconnect();

  if (!modelInDB) {
    return res
      .status(400)
      .json({ message: "There is no comment with that ID: " + id });
  }

  return res.status(200).json(modelInDB);
};

const updateModel = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id } = req.query;

  await db.connect();

  const modelToUpdate = await Comment.findById(id);

  if (!modelToUpdate) {
    await db.disconnect();
    return res
      .status(400)
      .json({ message: "There is no comment with that ID: " + id });
  }

  const {
    description = modelToUpdate.description,
    answers = modelToUpdate.answers,
    updatedAt = Date.now()
  } = req.body;

  try {
    const updatedModel = await Comment.findByIdAndUpdate(
      id,
      {
        description,
        answers,
        updatedAt
      },
      { runValidators: true, new: true }
    );
    await db.disconnect();
    res.status(200).json(updatedModel!);
  } catch (error: any) {
    await db.disconnect();
    res.status(400).json({ message: error.errors.status.message });
  }
};

const deleteModel = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id } = req.query;

  await db.connect();

  const modelToDelete = await Comment.findById(id);

  if (!modelToDelete) {
    await db.disconnect();
    return res
      .status(400)
      .json({ message: "There is no comment with that ID: " + id });
  }

  try {
    const deleteModel = await Comment.findByIdAndDelete(id);
    switch (modelToDelete.type) {
      case "": {
        //DELETING MAIN COMMENTS ANSWERS NUMBER
        if(deleteModel){
          const parent = await getCommentById(deleteModel.parent_id)
          if(parent){
            const answers = await getCommentsLengthByParentId(parent._id);
            await Comment.findByIdAndUpdate(
              parent._id,
              {answers},
              { runValidators: true, new: true }
            );
          }
        }
        break;
      }
      //DELETING MAIN.COMMENTS NUMBER
      case "clinic": {
        const comments = await getCommentsLengthByParentId(modelToDelete.parent_id);
        await Clinic.findByIdAndUpdate(
          modelToDelete.parent_id,
          { comments },
          { runValidators: true, new: true }
        );
        break;
      }
    }
    await db.disconnect();
    res.status(200).json(deleteModel!);
  } catch (error: any) {
    await db.disconnect();
    res.status(400).json({ message: error.errors.status.message });
  }
};
