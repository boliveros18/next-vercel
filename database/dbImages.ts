import { db } from ".";
import { Image, IImage } from "../models";

export const getImageByParentId = async (
  parent_id: string | string[] | undefined
): Promise<any> => {
  const params = parent_id ? { parent_id: parent_id } : {};
  await db.connect();
  const image = await Image.find(params).lean();
  if (image[0] === undefined) {
    return {} as IImage;
  }
  await db.disconnect();
  return JSON.parse(JSON.stringify(image[0]));
};
