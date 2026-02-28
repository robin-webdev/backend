import type { AxiosResponse } from "axios";

export type LoginType = (
  password: string,
  username?: string | undefined,
  email?: string | undefined,
) => Promise<AxiosResponse<any, any, {}> | undefined>;

export interface LoginInputs {
  usernameOrEmail: string;
  password: string;
}
