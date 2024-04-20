import { createContext, Dispatch, ReactNode, useState } from "react";
import { Todo } from "../config";

interface TodoState {
  todos: Todo[] | null;
}

interface SetTodosAction {
  type: "SET_TODOS";
  payload: Todo[];
}

interface CreateTodoAction {
  type: "CREATE_TODO";
  payload: Todo;
}

interface DeleteTodoAction {
  type: "DELETE_TODO";
  payload: Todo;
}

type Action = SetTodosAction | CreateTodoAction | DeleteTodoAction;

interface TodoContextState extends TodoState {
  dispatch: Dispatch<Action>;
}

export const TodoContext = createContext<TodoContextState | null>(null);

const TodoContextProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[] | null>(null);

  const dispatch = (action: Action) => {
    switch (action.type) {
      case "SET_TODOS":
        setTodos(action.payload);
        break;
      case "CREATE_TODO":
        setTodos([action.payload, ...(todos ?? [])]);
        break;
      case "DELETE_TODO":
        setTodos(
          todos?.filter((todo) => todo._id !== action.payload._id) ?? null
        );
        break;
      default:
        break;
    }
  };

  return (
    <TodoContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;
