import { IUser } from "../auth/auth.models";

export interface Todo {
  "_id": string;
  "title": string;
  "description": string;
  "completed": boolean;
  "user": string | IUser;
}

export type CreateTodoInput = Pick<Todo, "title" | "description">;
export type UpdateTodoInput = Partial<Omit<Todo, "user">>;
export type DeleteTodoInput = { _id: string };