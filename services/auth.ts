import { ApiClient } from "../apis";

export const login = async (email: string, password: string) => {
  const { data } = await ApiClient.post("/user/login", { email, password });
  return data;
};
