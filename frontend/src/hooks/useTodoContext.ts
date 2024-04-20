import { TodoContext } from "../context/TodoContext";
import { useContext } from "react";

export function useTodoContext() {
  const context = useContext(TodoContext);

  if (!context) {
    throw Error("useTodoContext must be used in context provider.");
  }

  return context;
}
