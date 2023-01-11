import { ApiClient } from "../apis";
import { Qualification } from "../interfaces";

export const updateOne = async (id: string, payload: Qualification) => {
    const res = await ApiClient.put(`/qualification/${id}`, payload);
    return res.data;
  };

