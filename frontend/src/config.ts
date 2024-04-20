export const USER_API = "http://localhost:3000/api/user";
export const TODO_API = "http://localhost:3000/api/todo";

export type User = {
  _id: String;
  username: String;
  email: String;
  password: String;
};
