import { ApiClient } from "../apis";
import { Like } from "../interfaces";

export const createOne = async (payload: Like) => {
  const res = await ApiClient.post("/like", payload);
  return res.data;
};

export const deleteOne = async (id: string) => {
    const res = await ApiClient.delete(`/like/${id}`);
    return res.data;
  };

