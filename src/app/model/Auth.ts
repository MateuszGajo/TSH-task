import { User } from "./User";

export interface Creds {
  username: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  expiresIn: string;
  access_token: string;
}
