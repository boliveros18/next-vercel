import { db } from ".";
import { Image, IImage } from "../models";

export const getImageByParentId = async (
  parent_id: string
): Promise<IImage[] | null> => {
  const params = parent_id ? { parent_id: parent_id } : {};
  await db.connect();
  const images: IImage[] = await Image.find(params).lean();
  await db.disconnect();
  return JSON.parse(JSON.stringify(images[0]));
};
