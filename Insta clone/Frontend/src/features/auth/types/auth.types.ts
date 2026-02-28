import type { AxiosResponse } from "axios";

export type LoginApiType = (
  password: string,
  username?: string | undefined,
  email?: string | undefined,
) => Promise<AxiosResponse | undefined>;

export type RegisterApiTypes = (
  name: string,
  username: string,
  email: string,
  password: string,
  profileImage: File,
) => Promise<AxiosResponse | undefined>;

export interface LoginInputs {
  usernameOrEmail: string;
  password: string;
}

export interface RegisterInputs {
  name: string;
  username: string;
  email: string;
  password: string;
  image: File;
}
