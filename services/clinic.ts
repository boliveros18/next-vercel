import { ApiClient } from "../apis";
import { Clinic } from "../interfaces";

export const updateOne = async (id: string, payload: Clinic) => {
    const res = await ApiClient.put(`/clinic/${id}`, payload);
    return res.data;
  };

