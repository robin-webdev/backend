import { create } from "zustand";
import type { LoginStoreStates } from "../types/store.types.ts";

const useLogin = create<LoginStoreStates>((set) => ({
  isLoggedIn: false,
  isLoading: false,
  error: null,
  setIsLoading: (newVal) => set({ isLoading: newVal }),
  setIsLoggedIn: (newVal) => set({ isLoggedIn: newVal }),
  setError: (err) => set({ error: err }),
}));

export default useLogin;
