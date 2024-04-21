import { TODO_API, Todo } from "../config";
import { formatDistanceToNow } from "date-fns";
import EditTodoModal from "./EditTodoModal";
import { useAuthContext } from "../hooks/useAuthContext";
import { useTodoContext } from "../hooks/useTodoContext";

const TodoList = ({ todos }: { todos: Todo[] }) => {
  const { user } = useAuthContext();
  const { dispatch } = useTodoContext();

  async function handleDelete(todoId: string) {
    if (!user) return;

    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    const response = await fetch(`${TODO_API}/delete-todo/${todoId}`, options);

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_TODO", payload: json });
    } else {
      alert(json.message);
    }
  }

  return (
    <div>
      <table className="table table-striped text-center">
        <thead>
          <tr>
            <th>Description</th>
            <th>Created at</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo: Todo, index: number) => (
            <tr key={index}>
              <td>{todo.description}</td>
              <td>{formatDistanceToNow(new Date(todo.createdAt))} ago</td>
              <td>
                <EditTodoModal todo={todo} />
              </td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(todo._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
