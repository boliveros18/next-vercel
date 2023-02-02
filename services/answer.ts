import { ApiClient } from "../apis";
import { Answer } from "../interfaces";

export const getAnswer = async (id: string) => {
  const res = await ApiClient.get(`/answer/${id}`);
  return res.data;
};

export const getAnswers = async (page?: number) => {
  const res = await ApiClient.get(`/answer?page=${page || 1}`);
  return res.data;
};

export const createOne = async (payload: Answer) => {
  const res = await ApiClient.post("/answer", payload);
  return res.data;
};

export const updateOne = async (id: string, payload: Answer) => {
  const res = await ApiClient.put(`/answer/${id}`, payload);
  return res.data;
};

export const deleteOne = async (id: string) => {
  const res = await ApiClient.delete(`/answer/${id}`);
  return res.data;
};
