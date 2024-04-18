import express from "express";
import requireAuth from "../middleware/requireAuth";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  updateTodo,
} from "../controllers/todoController";

const todoRouter = express.Router();

todoRouter.use(requireAuth);

todoRouter.get("/", getAllTodos);
todoRouter.post("/create-todo", createTodo);
todoRouter.delete("/delete-todo/:id", deleteTodo);
todoRouter.put("/update-todo/:id", updateTodo);

export default todoRouter;
