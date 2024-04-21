import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { TODO_API } from "../config";

const CreateTodoPage = () => {
  const [description, setDescription] = useState("");
  const { user, dispatch } = useAuthContext();

  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!user) return;

    const body = { description };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(body),
    };

    const response = await fetch(`${TODO_API}/create-todo`, options);

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "CREATE_TODO", payload: json });
      setDescription("");
      alert("Todo created successfully!");
    } else {
      alert(json.message);
    }
  }

  return (
    <div className="d-flex justify-content-center">
      <form
        className="border border-secondary w-25 mt-5 p-4 rounded d-flex flex-column gap-5 fs-5"
        onSubmit={handleCreate}
      >
        <div className="d-flex flex-column gap-2">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-control"
          />
        </div>

        <button className="btn btn-primary">Create</button>
      </form>
    </div>
  );
};

export default CreateTodoPage;
