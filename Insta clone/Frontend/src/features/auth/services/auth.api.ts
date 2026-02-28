import axios from "axios";
import type { LoginApiType, RegisterApiTypes } from "../types/auth.types.ts";

const api = axios.create({
  baseURL: "http://localhost:3000/api/auth/",
  withCredentials: true,
});

export const loginAPI: LoginApiType = async (
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

export const registerAPI: RegisterApiTypes = async (
  name,
  username,
  email,
  password,
  profileImage,
) => {
  try {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("profileImage", profileImage);

    console.log(formData);

    const response = await api.post("/register", formData);

    console.log(response);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error);
      return error.response;
    }
  }
};
