import { loginAPI, registerAPI } from "../services/auth.api.ts";
import type { LoginApiType, RegisterApiTypes } from "../types/auth.types.ts";

export function useAuth() {
  const login: LoginApiType = async (password, email, username) => {
    return await loginAPI(password, username, email);
  };

  const registerUser: RegisterApiTypes = async (
    name,
    username,
    email,
    password,
    profileImage,
  ) => {
    return await registerAPI(name, username, email, password, profileImage);
  };

  return { login, registerUser };
}
