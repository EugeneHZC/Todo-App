import { useEffect } from "react";
import TodoList from "../components/TodoList";
import { TODO_API } from "../config";
import { useAuthContext } from "../hooks/useAuthContext";
import { useTodoContext } from "../hooks/useTodoContext";

const HomePage = () => {
  const { todos, dispatch } = useTodoContext();
  const { user } = useAuthContext();

  useEffect(() => {
    async function fetchTodos() {
      if (!user) return;

      const options = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const response = await fetch(`${TODO_API}/`, options);

      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_TODOS", payload: json });
      } else {
        alert(json);
      }
    }

    fetchTodos();
  }, [dispatch, user]);

  return (
    <div>
      <TodoList todos={todos || []} />
    </div>
  );
};

export default HomePage;
