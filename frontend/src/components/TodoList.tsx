import { Todo } from "../config";

const TodoList = ({ todos }: { todos: Todo[] }) => {
  return (
    <table>
      <tr>
        <th>Description</th>
        <th>Created at</th>
        <th>Buttons</th>
      </tr>
      {todos.map((todo: Todo, index: number) => (
        <tr key={index}>
          <td>{todo.description}</td>
          <td>{todo.timestamp}</td>
          <td>
            <button className="btn btn-primary">Edit</button>
          </td>
          <td>
            <button className="btn btn-danger">Delete</button>
          </td>
        </tr>
      ))}
    </table>
  );
};

export default TodoList;
