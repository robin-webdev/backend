import { loginAPI } from "../services/auth.api.ts";
import type { LoginType } from "../types/auth.types.ts";

export  function useAuth() {
  const login: LoginType = async (password, email, username) => {
    const data = await loginAPI(password, username, email);
  
    return data;
  };


  return { login };
}
