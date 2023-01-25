import { ApiClient } from "../apis";
import { Like } from "../interfaces";

export const createOne = async (payload: Like) => {
  const res = await ApiClient.post("/like", payload);
  return res.data;
};

export const getLikes= async () => {
  const res = await ApiClient.get(`/like`);
  return res.data;
}

export const getLike = async (id: string) => {
  const res = await ApiClient.get(`/like/${id}`);
  return res.data;
};

export const deleteOne = async (id: string) => {
    const res = await ApiClient.delete(`/like/${id}`);
    return res.data;
  };

