import Todo from "../models/TodoModel";
import { Request, Response } from "express";
import { UserDocument } from "../models/UserModel";

declare global {
  namespace Express {
    interface Request {
      user?: UserDocument;
    }
  }
}

async function getAllTodos(req: Request, res: Response) {
  try {
    const userId = req.user?._id;

    const todos = await Todo.find({ userId }).sort({ createdAt: -1 });

    res.json(todos);
  } catch (error) {
    res.json({ message: "Failed to get todos.", content: error });
  }
}

async function createTodo(req: Request, res: Response) {
  const { description } = req.body;

  try {
    const userId = req.user?._id;

    const newTodo = { description, userId };

    const response = await Todo.create(newTodo);

    res.json({ message: "Todo created successfully!", content: response });
  } catch (error) {
    res.json({ message: "Failed to create todo.", content: error });
  }
}

async function deleteTodo(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const todo = await Todo.findOneAndDelete({ _id: id });

    if (!todo) {
      res.json({ message: "No todo found." });
      return;
    }

    res.json({ message: "Todo deleted successfully!", content: todo });
  } catch (error) {
    res.json({ message: "Failed to delete todo.", content: error });
  }
}

async function updateTodo(req: Request, res: Response) {
  const { id } = req.params;
  const { description } = req.body;

  try {
    const todo = await Todo.findByIdAndUpdate({ _id: id }, { description });

    if (!todo) {
      res.json({ message: "No todo found." });
      return;
    }

    res.json({ message: "Todo updated successfully!" });
  } catch (error) {
    res.json({ message: "Failed to update todo.", content: error });
  }
}

export { getAllTodos, createTodo, deleteTodo, updateTodo };
