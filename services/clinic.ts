import { entriesApi } from "../apis";
import { Clinic } from "../interfaces";

export const updateOne = async (id: string, payload: Clinic) => {
    const res = await entriesApi.put(`/clinic/${id}`, payload);
    return res.data;
  };

