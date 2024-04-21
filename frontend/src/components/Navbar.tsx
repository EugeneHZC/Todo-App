import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

const Navbar = () => {
  const { user } = useAuthContext();
  const logout = useLogout();

  function handleLogout() {
    if (!user) return;

    logout();
  }

  return (
    <nav className="border-bottom border-secondary border-3 navbar p-3 d-flex justify-content-space-between align-items-center">
      <Link to="/" className="text-muted fs-2 text-decoration-none fw-bold">
        Todo App
      </Link>

      {user && (
        <div className="d-flex gap-4 align-items-center">
          <Link to="/" className="fs-5 text-secondary text-decoration-none">
            Home
          </Link>
          <Link
            to="/create-todo"
            className="fs-5 text-secondary text-decoration-none"
          >
            Create
          </Link>
          <div className="d-flex align-items-center gap-2">
            <p className="fs-5 text-secondary m-0">{user.username}</p>
            <button className="btn btn-danger btn-sm" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      )}

      {!user && (
        <div className="d-flex gap-3 m-2">
          <Link
            to="/sign-up"
            className="fs-5 text-secondary text-decoration-none"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="fs-5 text-secondary text-decoration-none"
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
