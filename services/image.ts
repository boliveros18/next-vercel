import { ApiClient } from "../apis";
import { Image } from "../interfaces";

export const getImagesByParentId = async (parent_id: string) => {
  const res = await ApiClient.get(`/image?parent_id=${parent_id}`);
  return res.data;
};

export const createOne = async (payload: Image) => {
  const res = await ApiClient.post("/image", payload);
  return res.data;
};

export const updateOne = async (id: string, payload: Image) => {
  const res = await ApiClient.put(`/image/${id}`, payload);
  return res.data;
};
