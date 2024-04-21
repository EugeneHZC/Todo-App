export const USER_API = "http://localhost:3000/api/user";
export const TODO_API = "http://localhost:3000/api/todo";

export type User = {
  username: string;
  email: string;
  token: string;
};

export type Todo = {
  _id: string;
  description: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};
