import { Todo } from "../config";
import { formatDistanceToNow } from "date-fns";

const TodoList = ({ todos }: { todos: Todo[] }) => {
  return (
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
              <button className="btn btn-primary btn-sm">Edit</button>
            </td>
            <td>
              <button className="btn btn-danger btn-sm">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TodoList;
