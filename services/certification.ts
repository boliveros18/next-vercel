import { ApiClient } from "../apis";
import { Certification } from "../interfaces";

export const updateOne = async (id: string, payload: Certification) => {
    const res = await ApiClient.put(`/certification/${id}`, payload);
    return res.data;
  };

