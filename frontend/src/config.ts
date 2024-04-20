export const USER_API = "http://localhost:3000/api/user";
export const TODO_API = "http://localhost:3000/api/todo";

export type User = {
  username: String;
  email: String;
  token: String;
};

export type Todo = {
  _id: String;
  description: String;
  userId: String;
  createdAt: Date;
  updatedAt: Date;
};
