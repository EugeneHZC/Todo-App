import { useState } from "react";
import { useSignUp } from "../hooks/useSignUp";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { signUp } = useSignUp();

  async function handleSignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (password === confirmPassword) {
      const { response, json } = await signUp(username, email, password);

      if (response.ok) {
        alert("User signed up successfully!");
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } else {
        alert(json.content);
      }
    } else {
      alert("Password and confirm password must be the same");
      setPassword("");
      setConfirmPassword("");
    }
  }

  return (
    <div className="d-flex justify-content-center mt-5">
      <form
        onSubmit={handleSignUp}
        className="border border-1 p-5 border-secondary bg-light w-25 rounded-3 d-flex gap-3 flex-column"
      >
        <h3>Sign Up</h3>

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

        <div>
          <label htmlFor="confirm-password">Confirm password</label>
          <input
            type="password"
            name="confirm-password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;
