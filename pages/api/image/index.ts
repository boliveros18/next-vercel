import type { NextApiRequest, NextApiResponse } from "next";
import { db, dbImages } from "../../../database";
import { Image, IImage } from "../../../models";
import { getSession } from "next-auth/react";

type Data = { message: string } | IImage | IImage[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return createModel(req, res);
    case "GET":
      return getImages(req, res);
    default:
      return res.status(400).json({ message: "The endpoint does not exist" });
  }
}

const createModel = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const session = await getSession({ req });
  if (!session) {
    return res
      .status(401)
      .json({ message: "You must be authenticated to do this" });
  }

  const { parent_id = "", url = "" } = req.body;
  await db.connect();

  const newModel = new Image({
    parent_id,
    url,
  });

  try {
    await newModel.save();
    await db.disconnect();
    return res.status(201).json(newModel);
  } catch (error: any) {
    await db.disconnect();
    console.log(error);
    res.status(400).json({
      message: error.message || "Check server logs",
    });
  }
};

const getImages = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const image = await dbImages.getImageByParentId(
      req.query.parent_id as string
    );
    return res.status(201).json(image);
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      message: error.message || "Check server logs",
    });
  }
  return;
};
