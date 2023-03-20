import { ApiClient } from "../apis";

export const getUser = async (id: string) => {
  const res = await ApiClient.get(`/user/${id}`);
  return res.data;
};