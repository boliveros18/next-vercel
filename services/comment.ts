import { ApiClient } from "../apis";
import { Comment } from "../interfaces";

export const updateOne = async (id: string, payload: Comment) => {
    const res = await ApiClient.put(`/comment/${id}`, payload);
    return res.data;
  };

