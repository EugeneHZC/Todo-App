import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useLogin();

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { response, json } = await login(username, email, password);

    if (response.ok) {
      alert("User login successfull!");
      setUsername("");
      setEmail("");
      setPassword("");
    } else {
      alert(json.content);
    }
  }

  return (
    <div className="d-flex justify-content-center mt-5">
      <form
        onSubmit={handleLogin}
        className="border border-1 p-5 border-secondary bg-light w-25 rounded-3 d-flex gap-3 flex-column"
      >
        <h3>Login</h3>

        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-control"
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
