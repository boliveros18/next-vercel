import { db } from ".";
import { Image, IImage } from "../models";

export const getImagesByParentId = async (
  parent_id: string | string[] | undefined
): Promise<IImage[] | []> => {
  const params = parent_id ? { parent_id: parent_id } : {};
  await db.connect();
  if(parent_id){
    const images = await Image.find(params).lean();
    await db.disconnect();
    return JSON.parse(JSON.stringify(images))
  }
  return []
};


