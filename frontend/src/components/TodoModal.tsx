import { useState } from "react";
import { TODO_API, Todo } from "../config";
import { useAuthContext } from "../hooks/useAuthContext";
import { useTodoContext } from "../hooks/useTodoContext";

const TodoModal = ({ todo }: { todo: Todo }) => {
  const [description, setDescription] = useState(String(todo.description));
  const { user } = useAuthContext();
  const { dispatch } = useTodoContext();

  async function handleSave(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();

    if (!user) return;

    const body = { description };

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(body),
    };

    const response = await fetch(
      `${TODO_API}/update-todo/${todo._id}`,
      options
    );

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "UPDATE_TODO", payload: json });
      alert("Todo updated sucessfully!");
    } else {
      alert(json.message);
    }
  }

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary btn-sm"
        data-bs-toggle="modal"
        data-bs-target={`#id${todo._id}`}
      >
        Edit
      </button>
      <div className="modal fade" id={`id${todo._id}`}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Todo</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={(e) => handleSave(e)}
                data-bs-dismiss="modal"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoModal;
