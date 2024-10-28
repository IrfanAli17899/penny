export type LoginInput = {
  email: string;
  password: string;
}

export type RegisterInput = {
  username: string;
  email: string;
  password: string;
}

export interface IUser {
  _id: number;
  username: string;
  email: string;
}

export type ForgetPasswordInput = {
  email: string;
}

export type ResetPasswordInput = {
  password: string;
  token: string;
}