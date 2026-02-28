export interface LoginStoreStates {
  isLoggedIn: boolean;
  isLoading: boolean;
  error: Error | null;

  setIsLoggedIn: (newVal: boolean) => void;
  setIsLoading: (newVal: boolean) => void;
  setError: (error: Error) => void;
}
