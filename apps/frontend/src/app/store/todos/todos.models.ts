import { IUser } from "../auth/auth.models";

export interface Todo {
  "_id": string;
  "title": string;
  "description": string;
  "completed": boolean;
  "user": string | IUser;
}

export interface GetTodosResponse {
  "data": Todo[]
  "total": number;
  "page": number;
  "limit": number;
  "totalPages": number;
}

export type GetTodosInput = {
  search?: string;
  filters?: { completed?: boolean };
  pagination?: { page: number, limit: number };
};

export type CreateTodoInput = Pick<Todo, "title" | "description">;
export type UpdateTodoInput = Partial<Omit<Todo, "user">>;
export type DeleteTodoInput = { _id: string };