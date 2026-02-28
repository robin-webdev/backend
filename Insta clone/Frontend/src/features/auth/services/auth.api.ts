import axios from "axios";
import type { LoginType } from "../types/auth.types.ts";

const api = axios.create({
  baseURL: "http://localhost:3000/api/auth/",
  withCredentials: true,
});

export const loginAPI: LoginType = async (
  password,
  username = undefined,
  email = undefined,
) => {
  try {
    const response = await api.post("/login", {
      username,
      email,
      password,
    });
    return response;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return error.response;
    } else {
      console.error(error);
    }
  }
};
